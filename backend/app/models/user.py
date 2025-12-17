from sqlalchemy import Column, Integer, String, Date
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), index=True, unique=True,nullable=False)
    password_hash = Column(String(255), nullable=False)
    risk_profile = Column(String(50), nullable=True)
    created_at = Column(Date, default=datetime.utcnow)