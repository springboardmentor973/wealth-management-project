from fastapi import APIRouter

router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)

# Example endpoint (optional for Swagger display)
@router.get("/")
def read_goals():
    return {"message": "Goals endpoint is working"}
