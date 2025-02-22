import csv
import random

def read_tsv(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            reader = csv.reader(file, delimiter='\t')
            return list(reader)
    except FileNotFoundError:
        raise FileNotFoundError(f"The file {file_path} was not found.")
    except csv.Error as e:
        raise ValueError(f"Error reading CSV file: {e}")

def get_unique_genre_terms(file_path):
    data = read_tsv(file_path)  
    genre_terms = {row[1] for row in data[1:]}
    return [{"id": idx, "genre": genre} for idx, genre in enumerate(genre_terms, start=1)]

def get_rows_by_genre(file_path, genre):
    data = read_tsv(file_path)
    return [row for row in data if row[1] == genre]


def get_rows_by_genre_limit(file_path, genre, limit=None):
    data = read_tsv(file_path)
    rows = [row for row in data if row[1] == genre]
    random.shuffle(rows)
    if limit:
        rows = rows[:limit]
    return rows

def generate_quiz(data, genre, num_questions):
    filtered_rows = [row for row in data if row[1] == genre]
    if len(filtered_rows) < num_questions:
        raise ValueError(f"Not enough questions available for genre {genre}")
    
    questions = []
    for idx, row in enumerate(random.sample(filtered_rows, num_questions), start=1):  # IDを追加
        correct_answer = row[2]
        incorrect_answers = random.sample([r[2] for r in filtered_rows if r[2] != correct_answer], 3)
        
        question = {
            'id': idx,  
            'question_content': row[5],  
            'correct_answer': correct_answer,
            'options': [correct_answer] + incorrect_answers
        }
        random.shuffle(question['options'])
        questions.append(question)
    
    return questions
if __name__ == "__main__":
    file_path = "data.tsv"
    genre = "Software"
    num_questions = 10
    try:
        data = read_tsv(file_path) 
        quiz = generate_quiz(data, genre, num_questions)  
        print(quiz)
    except Exception as e:
        print(f"An error occurred: {e}")