# backend/app/routers/simulations.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from sqlalchemy import text


from app.schemas.simulation import SimulationInput, SimulationResult  # we will create this

router = APIRouter(prefix="/simulations", tags=["Simulations"])

# -------------------------
# TEMP fake user dependency
# (same approach as goals.py)
# -------------------------
def get_current_user():
    return {"id": 1}

# Fake storage for simulation results (temporary)
simulation_storage = {}

# POST /simulations/run
@router.post("/run", response_model=SimulationResult)
def run_simulation(
    input_data: SimulationInput,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    """
    Run simulation for a goal.
    Store result in temporary memory (simulation_storage) for now.
    """
    goal_id = input_data.goal_id

    # Check if goal exists
    goal = db.execute(
        text("SELECT * FROM goals WHERE id = :id AND user_id = :uid"),
        {"id": goal_id, "uid": user["id"]}
    ).fetchone()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    # Example projection logic: add monthly contribution to current_amount * months
    projected_amount = goal.current_amount + input_data.months * goal.monthly_contribution

    # Store in memory (simulate DB)
    simulation_storage[goal_id] = {
        "goal_id": goal_id,
        "projected_amount": projected_amount
    }

    return SimulationResult(
        goal_id=goal_id,
        projected_amount=projected_amount
    )

# GET /simulations/{goal_id}
@router.get("/{goal_id}", response_model=SimulationResult)
def get_simulation(goal_id: int, user=Depends(get_current_user)):
    """
    Return previously run simulation for a goal
    """
    result = simulation_storage.get(goal_id)
    if not result:
        raise HTTPException(status_code=404, detail="No simulation found for this goal")
    
    return SimulationResult(**result)
