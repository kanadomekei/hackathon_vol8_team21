from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
import datetime

Base = declarative_base()

class Data(Base):
    __tablename__ = "data"
    id = Column(Integer, primary_key=True)
    genre_term = Column(String(255), nullable=False)
    word_term = Column(String(255), nullable=False)
    word_definition = Column(Text, nullable=False)
    word_explanation = Column(Text, nullable=False)
    question_content = Column(Text, nullable=False)
    correct_answer = Column(String(255), nullable=False)
    difficulty = Column(Integer, nullable=False)

class DataModel(BaseModel):
    id: int
    genre_term: str
    word_term: str
    word_definition: str
    word_explanation: str
    question_content: str
    correct_answer: str
    difficulty: int

    class Config:
        orm_mode = True