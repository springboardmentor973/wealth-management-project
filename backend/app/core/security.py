from passlib.context import CryptContext
from jose import jwt
from jose.exceptions import ExpiredSignatureError, JWTError
from datetime import datetime, timedelta
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status

oauth_scheme =  OAuth2PasswordBearer(tokenUrl="login")
pwd_context = CryptContext(
    schemes=["bcrypt"]
)

def hash_password(password : str) -> str:
    return pwd_context.hash(password)

def verify_password(plain : str, hashed : str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_token(data : dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES or 30)
    to_encode.update({"exp" : expire})
    return jwt.encode(to_encode, SECRET_KEY, ALGORITHM)

def decode_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, [ALGORITHM])
        return payload
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token Expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(token : str = Depends(oauth_scheme)):
    userData = decode_access_token(token)
    if userData.get("user_id"):
        return {"user_id" : userData["user_id"]}
    elif userData.get("email"):
        return {"email": userData["email"]}
    else: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Use this function to create a token 
# token = create_token({'user_id': 1, 'email' : "sample-email"})
# print(token)