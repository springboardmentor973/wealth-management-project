from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1️⃣ Base for all models
Base = declarative_base()

# 2️⃣ PostgreSQL connection
DATABASE_URL = "postgresql://postgres:Welcome%40123@localhost:5432/wealth_database"

# 3️⃣ Engine & Session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4️⃣ Initialize the database (create tables)
def init_db():
    # Import models inside the function to avoid circular imports
    from app.models.user import User
    from app.models.goal import Goal
    from app.models.investment import Investment

    # Create all tables defined by Base subclasses
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")
