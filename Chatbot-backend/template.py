import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format="[%(asctime)s]: %(message)s:")

# New list of files and directories for a FastAPI project
list_of_files = [
    "app/__init__.py",
    "app/main.py",
    "app/api/__init__.py",
    "app/api/endpoints/chat.py",
    "app/core/__init__.py",
    "app/core/config.py",
    "app/db/__init__.py",
    "app/db/pinecone.py",
    "app/utils/__init__.py",
    "app/utils/helper.py",
    "app/utils/prompts.py",
    "data/.gitkeep", # For your new restaurant PDF data
    ".env",
    "requirements.txt",
    "store_index.py",
]

# Looping through the list of files to create the project structure
for filepath in list_of_files:
    filepath = Path(filepath)
    filedir, filename = os.path.split(filepath)

    if filedir != "":
        os.makedirs(filedir, exist_ok=True)
        logging.info(f"Creating directory: {filedir} for the file: {filename}")

    if (not os.path.exists(filepath)) or (os.path.getsize(filepath) == 0):
        with open(filepath, "w") as f:
            pass
        logging.info(f"Creating empty file: {filepath}")

    else:
        logging.info(f"{filename} is already created")
