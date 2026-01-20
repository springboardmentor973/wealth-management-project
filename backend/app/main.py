from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import the database initialization function
from app.database import init_db
from app.routers import auth,goals
from app.models import goal,investment,user
from app.routers import portfolio
from app.routers import simulations
from app.routers import simulation


app = FastAPI(title="Wealth Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()


@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/db")
def database():
    return {"status": "DB connected & backend running"}

@app.get("/port")
def port():
    return {"message": "Welcome to the Portfolio Management API"}

app.include_router(auth.router)
app.include_router(goals.router)
app.include_router(portfolio.router)
app.include_router(simulation.router)
app.include_router(simulations.router)
