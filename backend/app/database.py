from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

###
#  Swap with your database url
# DATABASE_URL = "postgresql://postgres:hanifuddin@localhost:5432/wealth_database"
# DATABASE_URL = "postgresql://postgres:Ak%4026042004@localhost:5432/wealth_database"
###
DATABASE_URL = "postgresql://postgres:HariPostgres123@localhost:5432/wealth_database"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
from base import Base

from models.user import User
from models.goal import Goal
from models.investment import Investment

def init_db():
    try:
        # Example: test connection
        with engine.connect() as conn:
            print("Database connection successful!")
    except Exception as e:
        print(f"Database connection failed: {e}")
