from fastapi import APIRouter, HTTPException, status, Request
from pydantic import BaseModel
from threading import Lock
import os
from typing import Dict

from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.memory import ConversationBufferMemory

# Import your custom modules
from app.core.config import settings
from app.db.vector_db import get_pinecone_vectorstore
from app.utils.prompts import prompt_template

# Initialize the FastAPI router
router = APIRouter()
# Load the Pinecone vector store
try:
    docsearch = get_pinecone_vectorstore()
except Exception as e:
    print(f"Failed to load Pinecone vector store at startup: {e}")
    docsearch = None  # Set to None if initialization fails

# Initialize the LLM
try:
    llm = ChatOpenAI(
        openai_api_key=settings.OPENAI_API_KEY,
        model_name="gpt-3.5-turbo",
        temperature=0.8,
        max_tokens=512,
    )
    
except Exception as e:
    print(f"Failed to initialize OPENAI LLM at startup: {e}")
    llm = None  # Set to None if initialization fails
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f"OpenAI API Key not configured. Error: {e}",
    )
except Exception as e:
    print(f"Failed to initialize OpenAI LLM at startup: {e}")
    llm = None
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f"An error occurred while initializing the OpenAI LLM. Error: {e}",
    )


# Define the prompt template for the RAG chain
PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)
chain_type_kwargs = {"prompt": PROMPT}

# Global lock for model inference to handle concurrent requests gracefully
inference_lock = Lock()

# In-memory storage for conversation history
conversation_memories: Dict[str, ConversationBufferMemory] = {}


# --- Helper to get or create conversation memory for a session ---
def get_conversation_memory(session_id: str) -> ConversationBufferMemory:
    """
    Retrieves or creates a ConversationBufferMemory instance for a given session ID.
    """
    if session_id not in conversation_memories:
        print(f"Creating new conversation memory for session: {session_id}")
        conversation_memories[session_id] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True,  # Return messages as objects for richer context
        )
    return conversation_memories[session_id]


# --- Pydantic model for request body validation ---
class ChatRequest(BaseModel):
    message: str
    session_id: str  # Added session_id to maintain conversation history


# --- Chat Endpoint ---
@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Handles chat requests, processes messages using the RAG pipeline,
    and maintains conversation history.
    """
    user_message = request.message.strip()
    session_id = request.session_id.strip()

    # 1. Handle empty requests gracefully
    if not user_message:
        print("Received empty message. Returning error.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Message cannot be empty."
        )

    # Check if core components are loaded
    if docsearch is None or llm is None:
        print("Chatbot core components not initialized. Returning error.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Chatbot is not ready. Please check backend logs.",
        )

    # Get or create memory for the session
    memory = get_conversation_memory(session_id)

    # Initialize the QA chain with memory
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=docsearch.as_retriever(search_kwargs={"k": 2}),
        return_source_documents=False,  # Set to False for cleaner output to frontend
        chain_type_kwargs=chain_type_kwargs,
        memory=memory,  # Pass the memory instance to the chain
    )

    bot_response = "Oops! The Pistachio Assistant is having trouble right now. Please try again later."

    # 2. Handle rapid requests and model inference delays gracefully
    if not inference_lock.acquire(blocking=False):
        print("Rapid request detected. Model is busy.")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="The chatbot is currently busy. Please try again in a moment.",
        )

    try:
        print(f"Processing message for session {session_id}: '{user_message}'")
        result = qa_chain.invoke({"query": user_message})
        bot_response = result.get("result", bot_response)
        print(f"Bot response for session {session_id}: '{bot_response}'")

    except Exception as e:
        print(f"Error during model inference for session {session_id}: {e}")
        import traceback

        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing your request: {str(e)}",
        )
    finally:
        inference_lock.release()  # Ensure lock is always released

    return {"answer": bot_response}
