class AddColumnCombinedData < ActiveRecord::Migration[7.0]
  def change
    add_column :combined_data, :genre_name, :string
    add_column :combined_data, :word_term, :string
    add_column :combined_data, :word_definition, :text
    add_column :combined_data, :word_explanation, :text
    add_column :combined_data, :question_content, :text
    add_column :combined_data, :correct_answer, :text
    add_column :combined_data, :difficulty, :integer
  end
end
