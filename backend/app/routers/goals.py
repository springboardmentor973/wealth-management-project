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
from fastapi import APIRouter, Depends
from core.security import get_current_user
from services.goal_projection import calculate_projection

#  Actual router (token is required to access)
router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)

# ✅ Dummy in-memory storage
GOALS = []
NEXT_ID = 1

@router.post("/")
def create_goal(goal: dict, current_user : dict = Depends(get_current_user)):
    global NEXT_ID
    new_goal = {
        "id": NEXT_ID,
        "goal_type": goal.get("goal_type"),
        "target_amount": goal.get("target_amount"),
        "target_date": goal.get("target_date"),
        "monthly_contribution": goal.get("monthly_contribution"),
        "current_amount": 0,
        "status": "active",
    }
    GOALS.append(new_goal)
    NEXT_ID += 1
    return {"message": "Goal created", "goal": new_goal}

@router.get("/")
def list_goals(current_user : dict = Depends(get_current_user)):
    goals_with_projection = []

    for g in GOALS:
        projected = calculate_projection(
            current_amount=g.get("current_amount") or 0,
            monthly_contribution=g.get("monthly_contribution") or 0,
            months_remaining=12,
            expected_return_rate=0.0,
        )

        g_with_proj = g.copy()
        g_with_proj["projected_value"] = projected

        goals_with_projection.append(g_with_proj)

    return {"goals": goals_with_projection}

@router.patch("/{goal_id}/progress")
def update_goal_progress(goal_id: int, data: dict, current_user : dict = Depends(get_current_user)):
    for g in GOALS:
        if g["id"] == goal_id:
            g["current_amount"] = data.get("current_amount",
            g["current_amount"])
            return {"message": "Progress updated", "goal": g}
    return {"error": "Goal not found"}
