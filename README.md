# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Pistachio Chatbot

A smart AI assistant for the Pistachio Restaurant, designed to answer customer queries about the menu, opening hours, reservations, and more. This chatbot leverages Retrieval Augmented Generation (RAG) to provide accurate and contextual responses, combining the power of OpenAI's Large Language Models with a Pinecone vector database for efficient information retrieval.

## Features
### Intelligent Q&A:
 Answers questions about the restaurant's menu, dishes, ingredients, opening hours, contact details, and story.

### Contextual Conversations:
 Maintains conversation history to provide relevant follow-up responses.

### Retrieval Augmented Generation (RAG):
 Uses a vector database (Pinecone) to retrieve relevant information from a knowledge base before generating responses with an LLM.

### OpenAI Integration:
 Utilizes OpenAI's powerful GPT-3.5 Turbo for natural language understanding and generation.

### Hugging Face Integration: Employs a Hugging Face sentence-transformers model for efficient text embedding.

### Modern Web Stack:
 Built with a FastAPI backend (Python) and a React frontend (JavaScript/Vite).

### Dockerized Backend:
 The backend is containerized for consistent and reliable deployment.

## Architecture
The application follows a client-server architecture with several key components:

### Frontend (React):
 A web-based user interface built with React (Vite) that provides the chat interface for users.

### Backend (FastAPI):
 A Python API built with FastAPI that handles user requests, orchestrates the RAG pipeline, and communicates with external services.

### Large Language Model (LLM): 
 OpenAI's gpt-3.5-turbo (or similar) is used for generating human-like responses.

### Embedding Model:
 Hugging Face's sentence-transformers/all-MiniLM-L6-v2 is used to convert text into numerical vector embeddings.

### Vector Database (Pinecone):
 An external, cloud-hosted vector database that stores the vectorized restaurant information and performs efficient similarity searches.

## graph TD
```
    User --> Frontend[React Frontend];
    Frontend --> Backend[FastAPI Backend];
    Backend --> OpenAI_LLM[OpenAI LLM (gpt-3.5-turbo)];
    Backend --> HuggingFace_Embeddings[Hugging Face Embeddings (all-MiniLM-L6-v2)];
    HuggingFace_Embeddings --> Pinecone[Pinecone Vector Database];
    Pinecone --> Backend;
    OpenAI_LLM --> Backend;
    Backend --> Frontend;
```

## Prerequisites
Before you begin, ensure you have the following installed:

```
Python 3.9+
Node.js & npm/yarn
Git
Docker Desktop (for local Docker builds/runs, optional but recommended)
OpenAI API Key: Obtain one from OpenAI Platform.
Pinecone API Key & Environment: Obtain from Pinecone Console.
```

## Local Setup
Follow these steps to get the chatbot running on your local machine.

### 1. Clone the Repository
```
git clone https://github.com/joyyy-99/Pistachio_react.git
```

```
cd Pistschio_react
```

### 2. Backend Setup (FastAPI)
Navigate to the root of your project where requirements.txt and the app/ directory are located.

#### a. Create a Python Virtual Environment

```
conda create -n pistachio python=3.13.5
```
## On Windows

```
conda activate pistachio
```
## On macOS/Linux
```
source venv/bin/activate
```


#### b. Install Python Dependencies
```
pip install -r requirements.txt
```

#### c. Configure Environment Variables
Create a file named .env in the root of your project and add your API keys and Pinecone details:

```
PINECONE_API_KEY="your_pinecone_api_key_here"
PINECONE_REGION="your_pinecone_region_here" # e.g., "us-east-1"
PINECONE_CLOUD="your_pinecone_cloud_here" # e.g., "aws"
INDEX_NAME="restaurant-chatbot" # Or your chosen Pinecone index name
OPENAI_API_KEY="your_openai_api_key_here"
FRONTEND_URL="http://localhost:5173" # Default Vite development server URL
```

#### d. Prepare the Pinecone Index
You need to populate your Pinecone index with the restaurant data. This typically involves a script like store_index.py (ensure you have one, and it's configured to use Hugging Face Embeddings and your RESTAURANT_DATA).

## Example: If you have a script to store data to Pinecone
```
python store_index.py
```

(Ensure store_index.py uses HuggingFaceEmbeddings and connects to your Pinecone index.)

#### e. Run the FastAPI Backend
```
uvicorn app.main:app --reload
```

The backend will typically run on http://127.0.0.1:8000.

## 3. Frontend Setup (React)
Open a new terminal and navigate to the root of your project.

#### a. Install Node.js Dependencies
```
npm install # or yarn install
```


#### c. Run the React Frontend
```
npm run dev # or yarn dev
```

The frontend will typically run on http://localhost:5173.

Open your browser to http://localhost:5173 to interact with the chatbot.

## Deployment to Render
This project is designed for deployment on Render, utilizing Docker for the backend and Render's static site hosting for the frontend.

### 1. Configure Backend Service on Render (Web Service - Docker)
Log in to Render and click "New" -> "Web Service".

### Connect your GitHub repository.

### Configure:
```
Name: pistachio-chatbot-backend
Region: Choose a region.
Branch: main (or your primary branch).
Root Directory: Leave blank if Dockerfile and app/ are at repo root.
Runtime: Select Docker.
Build Command: Leave blank (Docker will handle it).
Start Command: Leave blank (Docker or Procfile will handle it).
HTTP Port: 8000 (as exposed in Dockerfile).
```
### Add Environment Variables (if necessary):
Environment Variables (Crucial): Add the following:
```
PINECONE_API_KEY: Your Pinecone API Key.
PINECONE_REGION: Your Pinecone region.
PINECONE_CLOUD: Your Pinecone cloud.
INDEX_NAME: restaurant-chatbot.
OPENAI_API_KEY: Your OpenAI API Key.
```

## 2. Configure Frontend Service on Render
On Render, click "New" -> "Static Site".
Connect the same GitHub repository.
Configure:
```
Name: pistachio-chatbot-frontend
Region: Same as backend.
Branch: main.
Root Directory: Leave blank if package.json and src/ are at repo root.
Build Command: npm install && npm run build
```
Publish Directory: dist


## 3. Link Deployed Services (Post-Deployment)
Once both services are deployed and have public URLs:

Get Backend URL: From your pistachio-chatbot-backend service on Render, copy its public URL (e.g., https://pistachio-chatbot-backend-xxxx.onrender.com).

Update Frontend VITE_BACKEND_URL: Go to pistachio-chatbot-frontend settings on Render, edit VITE_BACKEND_URL, and set it to your backend's URL including the endpoint: https://pistachio-chatbot-backend-xxxx.onrender.com/chat. This will trigger a redeploy of your frontend.

Get Frontend URL: From your pistachio-chatbot-frontend service, copy its public URL (e.g., https://pistachio-chatbot-frontend-yyyy.onrender.com).

Update Backend FRONTEND_URL (CORS): Go to pistachio-chatbot-backend settings on Render, edit FRONTEND_URL, and set it to your frontend's URL: https://pistachio-chatbot-frontend-yyyy.onrender.com. This will trigger a redeploy of your backend.

## 4. Final Testing
Open your deployed frontend URL (https://pistachio-chatbot-frontend-yyyy.onrender.com) in your browser. The chatbot should now be fully functional, communicating with your deployed backend, which in turn uses OpenAI and Pinecone.

## Usage
Interact with the chatbot by typing your questions in the input field or double clicking on the quick suggestion buttons. The chatbot will provide information about the Pistachio Restaurant based on its knowledge base.

## Troubleshooting
### "Out of memory" errors on Render:
 Ensure your backend is fully using OpenAI for the LLM and not attempting to load any large local models.

### CORS issues:
 Double-check that FRONTEND_URL in your backend's Render environment variables exactly matches the deployed URL of your frontend.

### Backend not responding:
 Check the logs of your backend service on Render for any errors or crashes during startup or request processing.

### Frontend not connecting:
 Ensure VITE_BACKEND_URL in your frontend's Render environment variables points to the correct, full URL of your deployed backend's /chat endpoint.

## Screenshots of bot at work
### Chatbot UI
![alt text](<WhatsApp Image 2025-07-12 at 18.43.09_515974dd.jpg>)

![alt text](<WhatsApp Image 2025-07-12 at 18.43.09_d2fc4a0a.jpg>)

### Render logs
![alt text](<Pistachio-Chatbot-App ・ Web Service ・ Render Dashboard - Google Chrome 12_07_2025 17_08_06.png>)