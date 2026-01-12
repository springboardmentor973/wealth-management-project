from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, goals
# Import the database initialization function
from app.database import init_db
from app.models import goal,investment,user
from app.routers import portfolio



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

@app.get("/port") 
def portf():
    return {"message": "Welcome to the Portfolio Management API"}

app.include_router(auth.router)
app.include_router(goals.router)
app.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])