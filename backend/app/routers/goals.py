from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.goal import Goal
from app.schemas.goal import GoalCreate, GoalProgressUpdate, GoalResponse

router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)


@router.post("/", response_model=GoalResponse)
def create_goal(goal: GoalCreate, db: Session = Depends(get_db)):
    new_goal = Goal(**goal.dict())
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal


@router.get("/", response_model=List[GoalResponse])
def get_goals(db: Session = Depends(get_db)):
    return db.query(Goal).all()


@router.put("/{goal_id}", response_model=GoalResponse)
def update_goal(goal_id: int, goal: GoalProgressUpdate, db: Session = Depends(get_db)):
    db_goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    for key, value in goal.dict(exclude_unset=True).items():
        setattr(db_goal, key, value)

    db.commit()
    db.refresh(db_goal)
    return db_goal


@router.delete("/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    db_goal = db.query(Goal).filter(Goal.id == goal_id).first()

    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    db.delete(db_goal)
    db.commit()
    return {"message": "Goal deleted successfully"}
