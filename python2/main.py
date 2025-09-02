from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
from blog import predict

#python -m uvicorn main:app --reload
app = FastAPI()

# --- CORS Configuration ---
origins = [
    "http://localhost:5173","http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[""],  # Allow all methods (GET, POST, etc.)
    allow_headers=[""],  # Allow all headers
)

# --- Pydantic Models for Request/Response Validation ---
class BlogPredictionRequest(BaseModel):
    blog: str
    
# --- API Endpoints ---
@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Python Backend!"}

@app.post("/api/blogprediction")
async def blog_prediction(request: BlogPredictionRequest):
    if not request.blog.strip():
        raise HTTPException(status_code=400, detail="Text is required(FastAPi)")

    try:
        result = predict(request.blog)
        
        return {
            "category":result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in predicting: {str(e)}")

# You can optionally run the app directly from this file for testing
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) # Run on a different port than Node.js