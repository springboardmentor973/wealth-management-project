from pydantic import BaseModel

class GoalCreate(BaseModel):
    pass


class GoalResponse(BaseModel):
    pass

class GoalProgressUpdate(BaseModel):
    current_amount: float