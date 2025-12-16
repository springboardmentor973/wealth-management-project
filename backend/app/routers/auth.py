from fastapi import APIRouter


router=APIRouter()

@router.post("/register")
def register():
    return {"status": "registered"}


@router.post("/login")
def login():
    return {"status": "Login successful"}