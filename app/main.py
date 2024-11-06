from fastapi import FastAPI
from Investors import Investors
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()
db = Investors()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/investor/{investor_name}")
async def get_investor(investor_name):
    record = db.get_investor(investor_name)
    return record

@app.get("/investors")
async def get_investors():
    records = db.get_investors()
    return records


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)