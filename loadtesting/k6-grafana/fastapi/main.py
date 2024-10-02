from fastapi import FastAPI
import time

app = FastAPI()

@app.get("/")
def read_root():
    time.sleep(0.2)  # Simulate a 1-second delay
    return {"message": "Hello, this is delayed by 0.2 second"}

@app.get("/ping")
def ping():
    return {"message": "pong"}