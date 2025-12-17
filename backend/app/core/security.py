from passlib.context import CryptContext
from jose import jwt, ExpiredSignatureError, JWTError
from datetime import datetime, timedelta
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

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
    to_encode.update({"expire" : expire})
    return jwt.encode(to_encode, SECRET_KEY, ALGORITHM)

def decode_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        return payload
    except ExpiredSignatureError:
        return {"error" : "Token has expired"}
    except JWTError:
        return {"error" : "Invalid token"}