from fastapi import APIRouter, Depends
from core.security import get_current_user

###
#  Actual router (token is required to access)
# router = APIRouter(
#     prefix="/goals",
#     tags=["Goals"],
#     dependencies=[Depends(get_current_user)]
# )
###

router = APIRouter(
    prefix="/goals",
    tags=["Goals"],
)

### 
# Repeated twice (remove it)
# @router.get("/")
# def read_goals():
#     return {"message": "Goals endpoint is working"}

# from fastapi import APIRouter
# router = APIRouter(prefix="/goals", tags=["Goals"])
###

# ✅ Dummy in-memory storage
GOALS = []
NEXT_ID = 1

@router.post("/")
def create_goal(goal: dict):
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
def list_goals():
    return {"goals": GOALS}

@router.patch("/{goal_id}/progress")
def update_goal_progress(goal_id: int, data: dict):
    for g in GOALS:
        if g["id"] == goal_id:
            g["current_amount"] = data.get("current_amount",
            g["current_amount"])
            return {"message": "Progress updated", "goal": g}
    return {"error": "Goal not found"}