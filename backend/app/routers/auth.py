from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import (
    verify_password, create_token, hash_password, get_current_user, 
    validate_password_strength, generate_random_string
)
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserLogin

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    validate_password_strength(user.password)
    hashed_pwd = hash_password(user.password)
    
    verification_code = generate_random_string(6)
    
    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hashed_pwd,
        is_verified=False,
        verification_code=verification_code
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Mock Email Sending
    print(f"------------- EMAIL SERVICE -------------")
    print(f"To: {new_user.email}")
    print(f"Subject: Wealth Management - Verify Email")
    print(f"Code: {verification_code}")
    print(f"-----------------------------------------")
    
    return new_user

@router.post("/verify")
def verify_email(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")
    code = data.get("code")
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if user.is_verified:
        return {"message": "User already verified"}
        
    if user.verification_code == code:
        user.is_verified = True
        user.verification_code = None
        db.commit()
        return {"message": "Email verified successfully"}
    else:
        raise HTTPException(status_code=400, detail="Invalid verification code")

@router.post("/forgot-password")
def forgot_password(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")
    user = db.query(User).filter(User.email == email).first()
    if not user:
         raise HTTPException(status_code=404, detail="User not found")
         
    new_password = generate_random_string(10) + "1A@" # Ensure it meets criteria
    user.password_hash = hash_password(new_password)
    db.commit()
    
    # Mock Email Sending
    print(f"------------- EMAIL SERVICE -------------")
    print(f"To: {email}")
    print(f"Subject: Wealth Management - Password Reset")
    print(f"New Password: {new_password}")
    print(f"-----------------------------------------")
    
    return {"message": "New password sent to your email"}

@router.post("/login")
def login(form_data: UserLogin, db: Session = Depends(get_db)):
    # Note: Using a custom UserLogin schema for cleaner JSON body, 
    # but OAuth2PasswordRequestForm is standard for swagger UI auth. 
    # If the frontend sends JSON {email, password}, UserLogin is better.
    # If using form-data, OAuth2PasswordRequestForm is better.
    # Given the frontend service sends JSON, we stick to UserLogin or handle both.
    
    user = db.query(User).filter(User.email == form_data.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid credentials"
        )
    
    if not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid credentials"
        )
        
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email not verified. Please verify your email."
        )
        
    access_token = create_token(data={"user_id": user.id, "email": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": {"name": user.name, "email": user.email}}

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    # Fetch full user object from DB based on ID from token
    user = db.query(User).filter(User.id == current_user.get("user_id")).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
