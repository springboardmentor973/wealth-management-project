from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.base import Base
from app.models.user import User
from app.models.goal import Goal
from app.models.transaction import Transaction

DATABASE_URL = "postgresql://postgres:kiranm5@localhost:5432/wealth_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
