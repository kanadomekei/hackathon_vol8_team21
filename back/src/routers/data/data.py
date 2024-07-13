from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from src.database.database import get_db
from src.model.model import Data, DataModel

router = APIRouter()

@router.get("/data", response_model=List[DataModel])
def get_all_data(db: Session = Depends(get_db)):
    data = db.query(Data).all()
    if not data:
        raise HTTPException(status_code=404, detail="Data not found")
    return data