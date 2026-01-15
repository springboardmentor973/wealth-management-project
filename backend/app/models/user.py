<<<<<<< HEAD
=======
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

def get_base():
    from app.base import Base
    return Base

class User(get_base()):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), index=True, unique=True,nullable=False)
    password_hash = Column(String(255), nullable=False)
    risk_profile = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow,nullable=False)
>>>>>>> 7fc715a18a819aef3f15b9da68e64c236fe4846f
