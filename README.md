Wealth Management Project — Springboard Internship

This repository contains the 8-week Wealth Management Project for Springboard interns.
Interns will build the frontend (React) and backend (FastAPI) under mentor guidance.

📁 Folder Structure
backend/   → FastAPI backend  
frontend/  → React + Tailwind frontend

🧑‍💻 Intern Git Instructions
Create your own branch:
git checkout -b yourname-branch

Add your code:

Backend → put in backend/

    # Backend Setup & Run Guide

    This backend is built using **FastAPI**.

    Follow the steps below to run the backend locally.

    ---

    ## 1️⃣ Create Virtual Environment

    ### Windows
        ```bash/terminal```
        python -m venv venv
        venv\Scripts\activate

    ### Macos/Linux ###
        python3 -m venv venv
        source venv/bin/activate

    ## 2️⃣ change directory and download requirements
        ```change directory```
            cd backend
        
        ```Download Requirements```
            pip install -r requirements.txt
    
    ## 3️⃣ Run the backend
        
        uvicorn app.main:app --reload

        ### Commom Issues ###

            ### Uvicorn Not Recognized ###
                make sure virtual environment is activated:- 
                
                ```windows```
                venv\Scripts\activate

                ```Macos/Linux```
                source venv/bin/activate

    ### Creating the .env file ###
        
        create a file named .env in the backend folder and add
            SECRET_KEY=your_secret_key
            ALGORITHM=HS256
            DB_URL=DATABASE_URL = "postgresql://postgres:Welcome%40123@localhost:5432/      wealth_database"
    
    ### Accesing Swagger documents ###

        open browser and go to (or ctrl+click):-
        http://127.0.0.1:8000/docs
        
    



Frontend → put in frontend/

Save work:
git add .
git commit -m "message"
git push origin yourname-branch

🎯 Project Features

Goal creation & tracking

Investment portfolio

Market price sync

Simulations

Recommendations

Reports

📅 Timeline (8 Weeks)

Setup + Auth

Goals

Portfolio

Market Data

Simulations

Recommendations

Reports

Final Demo
