from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import the database initialization function
from app.database import init_db  # Cloud DB: Ensure all tables are created
from app.routers import auth, goals, portfolio, progress, simulation, simulations
from app.models import goal, investment, user

# Cloud DB: Create all tables in Neon PostgreSQL at startup
init_db()

app = FastAPI(title="Wealth Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
app.include_router(progress.router)
app.include_router(simulation.router, prefix="/simulation", tags=["simulation"])
app.include_router(simulations.router, prefix="/simulations", tags=["simulations"])