from fastapi import APIRouter
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login():
    # TEMP user (DB verification will come later)
    access_token = create_access_token({"user_id": 1})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
