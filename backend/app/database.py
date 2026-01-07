from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:Hanifuddin@localhost:5432/wealth_database"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

from app.models.user import User
from app.models.goal import Goal

def init_db():
    try:
        # Example: test connection
        with engine.connect() as conn:
            print("Database connection successful!")
    except Exception as e:
        print(f"Database connection failed: {e}")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()