from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import the database initialization function
from database import init_db
from routers import auth, goals, portfolio, progress


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
app.include_router(portfolio.router)
app.include_router(progress.router)