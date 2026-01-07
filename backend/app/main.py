from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from app.routers import auth, goals
from routers.auth import router as auth_router
from routers.goals import router as goals_router
from routers.progress import router as progress_router
# Import the database initialization function
from database import init_db
from models import goal,investment,user


app = FastAPI(title="Wealth Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the database when the application starts
@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/db")
def database():
    return {"status": "DB connected & backend running"}

@app.get("/hi")
def hi():
    return {"status":"new get message created "}

@app.get("/hello")
def hello():    
    return {"status":"hello from backend task1"}

@app.get("/task4")
def task4():    
    return {"status":"conflict resolved task4"}

app.include_router(auth_router)
app.include_router(goals_router)
app.include_router(progress_router)
