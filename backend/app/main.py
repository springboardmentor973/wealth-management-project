from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, goals


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

@app.get("/hi")
def hi():
    return {"status":"new get message created "}

@app.get("/task")
def tasks():
    return {"status":"Task1 completed"}

@app.get("task2")
def tasks2():
    return {"status":"Task2 Goals router added"}

app.include_router(auth.router)
app.include_router(goals.router)
