# company-scraper
This project is used to make an app that scrape the web and give a suggestion based on the input prompt/description

## Required dependency

### Frontend
1. React
2. Vite
3. Tailwind
3. Postcss

### Backend
1. fastapi
2. uvicorn
3. requests

## How to run the program
1. intialize the frontend and backend (npm install for frontend and pip install -r requirement.txt for the backend).
2. change the API key for your search engine of choice inside the app.py file.
3. run the backend first by exetucing python -m uvicorn app:app --reload.
4. run the frontend application in a separate terminal using npm run dev.
5. the application should run in your local computer. 