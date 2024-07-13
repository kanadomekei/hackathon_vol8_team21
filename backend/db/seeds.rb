require "csv"

CSV.open('db/data.csv','w', :force_quotes => true) do |people|
  File.foreach("db/data.tsv") {|line| people <<  line.chomp.split(/\t/)}
end

CSV.foreach("db/data.csv", headers: true) do |row|
  CombinedData.create(
    genre_name: row['genre_term'],
    word_term: row['word_term'],
    word_definition: row['word_definition'],
    word_explanation: row['word_explanation'],
    question_content: row['question_content'],
    correct_answer: row['correct_answer'],
    difficulty: row['difficulty']
  )
end

