import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """
    Configuration settings for the application, loaded from environment variables.
    """

    PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY", "")
    print(PINECONE_API_KEY)
    PINECONE_REGION: str = os.getenv(
        "PINECONE_REGION", "us-east-2"
    )  # Default to us-east-2 if not set
    PINECONE_CLOUD: str = os.getenv(
        "PINECONE_CLOUD", "aws"
    )  # Default to aws if not set
    INDEX_NAME: str = os.getenv("INDEX_NAME", "pistachio")
    # OpenAI API Key
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    print(OPENAI_API_KEY)

    # Frontend URL for CORS
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")


settings = Settings()
