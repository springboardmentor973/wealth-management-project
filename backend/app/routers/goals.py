from fastapi import APIRouter

router = APIRouter(prefix="/goals", tags=["Goals"])

@router.get("/")
def list_goals():
    return {"message": "Goals route working"}

from sqlalchemy import Column, Integer, String, Float
from app.database import Base
class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    target_amount = Column(Float, nullable=False)
