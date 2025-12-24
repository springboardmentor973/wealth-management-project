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


    ### Accessing the Goals api ###

        1️⃣run the Backend Server
            ```bash/Terminal```
            uvicorn app.main:app --reload
    
        2️⃣Open swagger docs
            http://127.0.0.1:8000/docs

        3️⃣Access /login endpoint
            http://127.0.0.1:8000/docs/login

            -> select try out,
            -> Enter the email and password and login,
            -> copy the Access Token

            ex:-
            {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer"
            }

        4️⃣Create Goal
            -> open POST/goals endpoint
            
            -> click on authorize
            -> now paste the access token as
                    ex:- Bearer <"your access token>
            -> now add the Goals data and execute

        5️⃣Check Goals
            -> open GET/goals endpoint
            -> verify the goals
        
        6️⃣Update Goals
            -> open PATCH/goals/{id}/progress
            -> click execute
            -> Enter goal-id 
            -> enter the updated data
            -> execute and verify


        
    



Frontend → put in frontend/

###Errors Section:-

    ### 1️⃣ ModuleNotFoundError / Import Errors
        ex:-
            ModuleNotFoundError: No module named 'app'
            ModuleNotFoundError: No module named 'routers'

        fix:-
            cd backend
            uvicorn app.main:app --reload

    ### 2️⃣ Uvicorn not found
        ex:- "uvicorn not Recognised"
        
        Fix → Activate virtual environment and install requirements

            windows:-
                venv\Scripts\activate
                pip install -r requirements.txt

            macos/linux:-
                source venv/bin/activate
                pip3 install -r requirements.txt


    ### 3️⃣ CORS Error (Frontend Cannot Call Backend)
        ex:- "CORS policy blocked request"
    
        fix:- check in app/main.py

            app.add_middleware(
                CORSMiddleware,
                allow_origins=["http://localhost:3000"],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"],
            )

            if not present add it

    ### 4️⃣ .env missing not loaded
        ex:- "secret key not found"
             "db_url missing"

        fix:- create a .env file in backend and add

                SECRET_KEY=your_secret
                ALGORITHM=HS256
                DB_URL=postgresql://user:password@localhost:5432/yourdb

            after this restart the backend

Save work:
git add .
git commit -m "message"
git push origin yourname-branch


###Errors Section:-

    ### 1️⃣ ModuleNotFoundError / Import Errors
        ex:-
            ModuleNotFoundError: No module named 'app'
            ModuleNotFoundError: No module named 'routers'

        fix:-
            cd backend
            uvicorn app.main:app --reload

    ### 2️⃣ Uvicorn not found
        ex:- "uvicorn not Recognised"
            
        Fix → Activate virtual environment and install requirements

              windows:-
                venv\Scripts\activate
                pip install -r requirements.txt

              macos/linux:-
                source venv/bin/activate
                pip3 install -r requirements.txt

    
    ### 3️⃣ CORS Error (Frontend Cannot Call Backend)
        ex:- "CORS policy blocked request"
        
        fix:- check in app/main.py

            app.add_middleware(
                CORSMiddleware,
                allow_origins=["http://localhost:3000"],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"],
            )

            if not present add it

    ### 4️⃣ .env missing not loaded
        ex:- "secret key not found"
             "db_url missing"

        fix:- create a .env file in backend and add

                SECRET_KEY=your_secret
                ALGORITHM=HS256
                DB_URL=postgresql://user:password@localhost:5432/yourdb

            after this restart the backend


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
