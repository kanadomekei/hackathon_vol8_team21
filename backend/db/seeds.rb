require "csv"

CSV.foreach('db/demonstration.csv', headers: true) do |row|
  CombinedData.create(
    genre_name: row['genre_name'],
    word_term: row['word_term'],
    word_definition: row['word_definition'],
    word_explanation: row['word_explanation'],
    question_content: row['question_content'],
    correct_answer: row['correct_answer'],
    difficulty: row['difficulty']
  )
end

