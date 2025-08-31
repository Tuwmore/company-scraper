from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your API key + Search Engine ID
API_KEY = "AIzaSyAcK1WyxtWqLF5GK3XirVbA4fNbufqnXA8"
CSE_ID = "947d625e8d7934c84"

def google_search(query, api_key, cse_id, num=5):
    # refine query to force company profile info
    refined_query = f'{query} company profile OR "about us" OR "corporate information"'
    url = f"https://www.googleapis.com/customsearch/v1?q={refined_query}&key={api_key}&cx={cse_id}&num={num}"
    response = requests.get(url)
    results = response.json()

    filtered_results = []
    if "items" in results:
        for item in results["items"]:
            # Only keep results that look like company pages
            if any(keyword in item.get("link", "").lower() for keyword in ["about", "company", "profile", "corporate"]):
                filtered_results.append({
                    "title": item.get("title"),
                    "link": item.get("link"),
                    "snippet": item.get("snippet"),
                    "reason": "Matched company profile-related keywords in URL or title"
                })

    return filtered_results

@app.get("/search")
async def search(q: str = Query(..., description="Company name or category")):
    results = google_search(q, API_KEY, CSE_ID)
    return results
