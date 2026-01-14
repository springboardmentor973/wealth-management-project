from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.base import Base
from app.models.user import User
from app.models.goal import Goal

from app.models.transaction import Transaction
from app.models.investment import Investment  # Ensure investments table is created

DATABASE_URL = "postgresql://neondb_owner:npg_Bh72oWsTzZGu@ep-old-dream-a1dzhm8q-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
