from fastapi import APIRouter
from app.schemas.simulation import SimulationInput, SimulationResult

router = APIRouter(prefix="/simulation", tags=["Simulation"])

@router.post("/", response_model=SimulationResult)
def run_simulation(data: SimulationInput):
    projected_value = data.monthly_contribution * data.duration * (1 + data.expected_return)
    return {"projected_value": projected_value}
