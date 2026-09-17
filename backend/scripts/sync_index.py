import hashlib
import json
import os
from pathlib import Path

from main import EMBEDDING_DIMENSION, embedding, clients

DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "portfolio.json"
NAMESPACE = os.getenv("PINECONE_NAMESPACE", "portfolio")
MANIFEST_ID = "portfolio-manifest"


def stringify(value):
    if isinstance(value, list):
        return "\n".join(stringify(item) for item in value)
    if isinstance(value, dict):
        return "\n".join(f"{key}: {stringify(item)}" for key, item in value.items())
    return str(value)


def main():
    portfolio = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    digest = hashlib.sha256(json.dumps(portfolio, sort_keys=True).encode()).hexdigest()
    gemini, index = clients()
    manifest = index.fetch(ids=[MANIFEST_ID], namespace=NAMESPACE).vectors.get(MANIFEST_ID)
    if manifest and manifest.metadata.get("content_hash") == digest:
        print("Portfolio content is unchanged; Pinecone update skipped.")
        return

    documents = [(section, f"{section.upper()}\n{stringify(value)}") for section, value in portfolio.items()]
    records = [{
        "id": f"portfolio-{section}",
        "values": embedding(gemini, text, "RETRIEVAL_DOCUMENT"),
        "metadata": {"source": "portfolio", "section": section, "text": text},
    } for section, text in documents]
    # This namespace is reserved for the portfolio index, so stale sections are safely removed.
    index.delete(filter={"source": {"$eq": "portfolio"}}, namespace=NAMESPACE)
    index.upsert(vectors=records + [{
        "id": MANIFEST_ID,
        "values": [0.0] * EMBEDDING_DIMENSION,
        "metadata": {"source": "portfolio-manifest", "content_hash": digest},
    }], namespace=NAMESPACE)
    print(f"Indexed {len(records)} portfolio sections.")


if __name__ == "__main__":
    main()
