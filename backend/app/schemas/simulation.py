# backend/app/schemas/simulation.py

from pydantic import BaseModel

class SimulationInput(BaseModel):
    goal_id: int
    months: int  # number of months to project

class SimulationResult(BaseModel):
    goal_id: int
    projected_amount: float
from pydantic import BaseModel

class SimulationInput(BaseModel):
    expected_return: float
    duration: int
    monthly_contribution: float


class SimulationResult(BaseModel):
    projected_value: float
