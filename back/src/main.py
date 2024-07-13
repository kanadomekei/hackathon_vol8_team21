from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
from .tsv import read_tsv, get_unique_genre_terms, get_rows_by_genre, generate_quiz

app = FastAPI()

router = APIRouter()

@router.get("/data", response_model=List[dict])
def get_data():
    file_path = os.path.join(os.path.dirname(__file__), "data.tsv")
    try:
        data = read_tsv(file_path)
        keys = ["id", "genre_term", "word_term", "word_definition", "word_explanation", "question_content", "correct_answer", "difficulty"]
        json_data = [dict(zip(keys, row)) for row in data[1:]]  # Skip header row
        return json_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Data file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)