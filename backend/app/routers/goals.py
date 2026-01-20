from fastapi import APIRouter, Depends
from app.core.security import get_current_user

router = APIRouter(prefix="/goals", tags=["Goals"])


@router.get("/")
def list_goals(user=Depends(get_current_user)):
    return {
        "message": "Protected goals route working",
        "user": user
    }
