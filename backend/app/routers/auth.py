from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register():
    return {"status": "registered"}

def create_access_token():
    # temporary dummy token (real JWT will come later)
    return "access-token"

@router.post("/login")
def login():
    access_token = create_access_token()
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
