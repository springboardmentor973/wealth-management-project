from pydantic import BaseModel

class SimulationInput(BaseModel):
    expected_return: float
    duration: int
    monthly_contribution: float


class SimulationResult(BaseModel):
    projected_value: float
