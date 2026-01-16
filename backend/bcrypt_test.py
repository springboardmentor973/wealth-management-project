from passlib.context import CryptContext
import bcrypt

pwd = CryptContext(schemes=["bcrypt"])
print(bcrypt.__version__)

h = pwd.hash("a")
print("HASH:", h)
print("VERIFY:", pwd.verify("a", h))