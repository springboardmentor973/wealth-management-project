from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.models.base import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, nullable=False)
    type = Column(String, nullable=False)
    quantity = Column(Float, nullable=True)
    price = Column(Float, nullable=True)
    fees = Column(Float, nullable=True)
    executed_at = Column(DateTime(timezone=True), server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

