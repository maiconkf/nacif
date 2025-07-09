import os
from typing import List

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todos.db")

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

def get_allowed_origins() -> List[str]:
    if ENVIRONMENT == "production":
        origins = ['https://nacif.netlify.app']
        frontend_url = os.getenv("FRONTEND_URL")
        if frontend_url:
            origins.append(frontend_url)
        return origins
    else:
        origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
        return [origin.strip() for origin in origins_env.split(",") if origin.strip()]

ALLOWED_ORIGINS = get_allowed_origins()
