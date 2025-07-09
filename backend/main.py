from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

load_dotenv()

from app.database import init_db, SessionLocal
from app.routes import router
from app.auth import create_sample_users
from app.config import ALLOWED_ORIGINS

app = FastAPI(title="Todo API", description="Simple Todo CRUD API with authentication")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.on_event("startup")
async def startup_event():
    init_db()
    db = SessionLocal()
    create_sample_users(db)
    db.close()

@app.get("/")
async def root():
    return {"message": "Todo API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
