# Portfolio chat

The React portfolio calls the separate FastAPI service in `backend/`. Set `VITE_CHAT_API_URL` in the frontend host's build-time environment to the deployed Render URL (or `http://localhost:8000` locally). The current Render URL is a fallback only; a deployment environment variable is preferred.

The Render service configuration is in `backend/render.yaml`. Add its Gemini, Pinecone, and CORS variables in Render. Set `PINECONE_DIMENSION` to the exact dimension of your cosine Pinecone index (for example, `1024`).

`backend/scripts/sync_index.py` runs during every Render build, but compares a content hash stored in Pinecone first. It performs no vector DB write unless `backend/data/portfolio.json` has changed. Update this JSON alongside portfolio content before deploying the backend.
