from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# 2️⃣ PostgreSQL connection
DATABASE_URL = "postgresql://postgres:Welcome%40123@localhost:5432/wealth_database"
# DATABASE_URL = "postgresql://postgres:kiranm5@localhost:5432/wealth_db"


engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    Base.metadata.create_all(bind=engine)
