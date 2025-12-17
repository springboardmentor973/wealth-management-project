from fastapi import APIRouter

router = APIRouter(prefix="/goals", tags=["Goals"])

@router.get("/")
def list_goals():
    return {"message": "Goals route working"}

