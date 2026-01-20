from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends
from app.core.security import verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

users = [
    {
        "user_id" :0,
        "email" : "sample-email@gmail.com",
        "password" : "$2b$12$bMpaXX8Bqq1L847u9QxUPueFDzsIhlxDn52ymds8XimgkiR/A2uwq"
        # use password as "sample-password"
    }
]

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = None
    for i in users:
        if i.get("email") == form_data.username:
            user = i
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    try:
        verified = verify_password(form_data.password, user.get("password"))
        if verified:
            token = create_token(data={"user_id" : user.get("user_id"), "email" : user.get("email")})
            return {"access_token": token, "token_type": "bearer"}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid password"
            )
    except (ValueError, TypeError) :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Error verifying password",
        )
    

### Steps to create a token
#
# navigate to localhost:8000/auth/login
# set body as
#
# {
#   "email" : "sample-email@gmail.com"
#   "password" : "sample-password"
# }
#
# The token will be returned
# Copy that token and set it in authorization
###