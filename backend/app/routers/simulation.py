from fastapi import APIRouter, Depends
from core.security import get_current_user
from schemas.simulation import SimulationInput, SimulationResult

router = APIRouter(
    prefix="/simulation", 
    tags=["Simulation"]
)

@router.post("/", response_model=SimulationResult)
def run_simulation(data: SimulationInput, current_user: dict = Depends(get_current_user)):
    projected_value = data.monthly_contribution * data.duration * (1 + data.expected_return)
    return {"projected_value": projected_value}
