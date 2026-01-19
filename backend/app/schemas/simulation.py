# backend/app/schemas/simulation.py

from pydantic import BaseModel

class SimulationInput(BaseModel):
    goal_id: int
    months: int  # number of months to project

class SimulationResult(BaseModel):
    goal_id: int
    projected_amount: float
