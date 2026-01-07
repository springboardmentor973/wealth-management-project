from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.goal import Goal
from app.schemas.goal import GoalCreate, GoalResponse, GoalProgressUpdate

router = APIRouter(prefix="/goals", tags=["Goals"])

# Fake user for now
def get_current_user():
    return {"id": 1}

# 1️⃣ CREATE
@router.post("/", response_model=GoalResponse)
def create_goal(
    goal: GoalCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    new_goal = Goal(
        goal_type=goal.goal_type,
        target_amount=goal.target_amount,
        current_amount=0,
        target_date=goal.target_date,
        monthly_contribution=goal.monthly_contribution,
        user_id=user["id"]
    )
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal

# 2️⃣ LIST
@router.get("/", response_model=List[GoalResponse])
def list_goals(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Goal).filter(Goal.user_id == user["id"]).all()

# 3️⃣ GET BY ID
@router.get("/{goal_id}", response_model=GoalResponse)
def get_goal(goal_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == user["id"]
    ).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal

# 4️⃣ UPDATE
@router.put("/{goal_id}", response_model=GoalResponse)
def update_goal(goal_id: int, data: GoalCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user["id"]).first()
    if not goal:
        raise HTTPException(status_code=403, detail="Unauthorized")
    goal.goal_type = data.goal_type
    goal.target_amount = data.target_amount
    goal.target_date = data.target_date
    goal.monthly_contribution = data.monthly_contribution
    db.commit()
    db.refresh(goal)
    return goal

# 5️⃣ UPDATE PROGRESS
@router.patch("/{goal_id}/progress", response_model=GoalResponse)
def update_progress(goal_id: int, data: GoalProgressUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user["id"]).first()
    if not goal:
        raise HTTPException(status_code=403, detail="Unauthorized")
    goal.current_amount = data.current_amount
    db.commit()
    db.refresh(goal)
    return goal

# 6️⃣ DELETE
@router.delete("/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user["id"]).first()
    if not goal:
        raise HTTPException(status_code=403, detail="Unauthorized")
    db.delete(goal)
    db.commit()
    return {"message": "Goal deleted"}