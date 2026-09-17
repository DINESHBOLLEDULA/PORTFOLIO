# Portfolio chat

The React portfolio calls the separate FastAPI service in `backend/`. Set `VITE_CHAT_API_URL` in `.env.local` to the deployed Render URL (or `http://localhost:8000` locally).

The Render service configuration is in `backend/render.yaml`. Add its Gemini, Pinecone, and CORS variables in Render. Create a 768-dimension cosine Pinecone index.

`backend/scripts/sync_index.py` runs during every Render build, but compares a content hash stored in Pinecone first. It performs no vector DB write unless `backend/data/portfolio.json` has changed. Update this JSON alongside portfolio content before deploying the backend.
