from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from base import Base
from models.user import User
from models.goal import Goal
from models.transaction import Transaction

# DATABASE_URL = "postgresql://postgres:Welcome%40123@localhost:5432/wealth_database"
DATABASE_URL = "postgresql://postgres:HariPostgres123@localhost:5432/wealth_database"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
