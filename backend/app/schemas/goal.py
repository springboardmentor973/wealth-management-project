from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class GoalCreate(BaseModel):
    goal_type: str
    target_amount: float
    target_date: date
    monthly_contribution: Optional[float]

class GoalResponse(BaseModel):
    id: int
    user_id: int
    goal_type: str
    target_amount: float
    target_date: date
    monthly_contribution: Optional[float] = None
    current_amount: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
        
class GoalProgressUpdate(BaseModel):
    current_amount: float