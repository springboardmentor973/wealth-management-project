from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)

    # Link goal to a user
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    goal_type = Column(String, nullable=False)
    target_amount = Column(Float, nullable=False)

    # NEW FIELD (Progress Tracking)
    current_amount = Column(Float, default=0)

    target_date = Column(Date, nullable=False)
    monthly_contribution = Column(Float, nullable=False)

    # Defaults
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
