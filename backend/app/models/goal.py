from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.base import Base


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign key to users table
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Goal details
    goal_type = Column(String, nullable=False)

    # Financial fields (use Numeric for money)
    target_amount = Column(Numeric, nullable=False)
    monthly_contribution = Column(Numeric, nullable=False)
    current_amount = Column(Numeric, nullable=False, default=0)

    # Date fields
    target_date = Column(Date, nullable=False)

    # Optional helper (can also be computed server-side)
    progress_percent = Column(Numeric, nullable=True)

    # Status & metadata
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
