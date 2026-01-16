from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models.simulation import Simulation
from core.security import get_current_user

router = APIRouter(
    prefix="/simulations", 
    tags=["simulations"]
)


@router.post("/run")
def run_simulation(
    payload: dict,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(SessionLocal)
):
    assumptions = payload.get("assumptions")
    results = payload.get("results")
    goal_id = payload.get("goal_id")

    if not assumptions or not results:
        raise HTTPException(
            status_code=400,
            detail="assumptions and results are required"
        )

    simulation = Simulation(
        user_id=current_user["user_id"],
        goal_id=goal_id,
        assumptions=assumptions,
        results=results
    )

    db.add(simulation)
    db.commit()
    db.refresh(simulation)

    return {
        "simulation_id": simulation.id,
        "status": "Simulation run and saved successfully."
    }


@router.get("/")
def get_simulations(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(SessionLocal)
):
    return (
        db.query(Simulation)
        .filter(Simulation.user_id == current_user["user_id"])
        .order_by(Simulation.created_at.desc())
        .all()
    )


@router.get("/goals/{goal_id}")
def get_simulations_by_goal(
    goal_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(SessionLocal)
):
    return (
        db.query(Simulation)
        .filter(
            Simulation.user_id == current_user["user_id"],
            Simulation.goal_id == goal_id
        )
        .order_by(Simulation.created_at.desc())
        .all()
    )
