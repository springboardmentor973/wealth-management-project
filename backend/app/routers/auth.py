from fastapi import APIRouter, Body, HTTPException, status
from core.security import verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

users = [
    {
        "user_id" :0,
        "email" : "sample-email@gmail.com",
        "password" : "$2b$12$ogZ6hlj7EEaWvgTLRnAale.2I/9.MbcpXKOHjQTv6MPdavolaktSi"
    }
]

@router.post("/login")
def login(email : str = Body(...), password : str = Body(...)):
    user = None
    for i in users:
        if i.get("user_email") == email:
            user = i
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    try:
        verified = verify_password(password, user.get("password"))
        if verified:
            token = create_token(data={"user_id" : user.get("user_id"), "email" : user.get("email")})
            return token
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