from pydantic import BaseModel
from datetime import date, datetime

class GoalCreate(BaseModel):
    goal_type: str
    target_amount: float
    current_amount: float
    progress_percent: float
    target_date: date

class GoalUpdate(BaseModel):
    current_amount: float
    progress_percent: float

class GoalResponse(BaseModel):
    id: int
    user_id: int
    goal_type: str
    target_amount: float
    current_amount: float
    progress_percent: float
    target_date: date
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
        
