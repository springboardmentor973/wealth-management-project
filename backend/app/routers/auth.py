from fastapi import APIRouter


router=APIRouter()

@router.post("/register")
def register():
    return {"status": "registered"}


def create_access_token():
    return "access-token"

@router.post("/login")
def login():
    access_token=create_access_token()
    return {
        "access_token":access_token,
        "token_type":"bearer"
    }