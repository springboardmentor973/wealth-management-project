from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Simulation(Base):
    __tablename__ = 'simulations'

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    goal_id = Column(Integer, ForeignKey('goals.id'), nullable=True)

    assumptions = Column(JSONB, nullable=False)
    results = Column(JSONB, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="simulations")
    goal = relationship("Goal", back_populates="simulations")

