from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
DOTENV_PATH = os.path.join(BASE_DIR, ".env")
ROOT_ENV_PATH = os.path.join(ROOT_DIR, ".env")

if os.path.exists(ROOT_ENV_PATH):
    load_dotenv(ROOT_ENV_PATH)
elif os.path.exists(DOTENV_PATH):
    load_dotenv(DOTENV_PATH)
else:
    load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured. Copy backend/.env or backend/.env.sample to a .env file and update it.")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
