import os
from pinecone import Pinecone as PineconeClient
from langchain_pinecone import Pinecone
from langchain_huggingface import HuggingFaceEmbeddings

# Import settings from your config
from app.core.config import settings

# Initialize embeddings model once
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": False},
)

# Initialize Pinecone client once
pc_client = PineconeClient(api_key=settings.PINECONE_API_KEY)


def get_pinecone_vectorstore():
    """
    Initializes and returns the LangChain Pinecone vector store from an existing index.
    """
    try:
        # Check if the index exists before trying to load it
        if settings.INDEX_NAME not in pc_client.list_indexes().names():
            print(
                f"Pinecone index '{settings.INDEX_NAME}' not found. Please run store_index.py first."
            )

            raise RuntimeError(f"Pinecone index '{settings.INDEX_NAME}' not found.")

        docsearch = Pinecone.from_existing_index(
            index_name=settings.INDEX_NAME,
            embedding=embeddings,
        )
        print(f"Successfully loaded Pinecone index: {settings.INDEX_NAME}")
        return docsearch
    except Exception as e:
        print(f"Error loading Pinecone vector store: {e}")
        raise  # Re-raise the exception to be caught by FastAPI's error handling
