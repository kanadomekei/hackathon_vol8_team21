class CreateCombinedData < ActiveRecord::Migration[7.0]
  def change
    create_table :combined_data do |t|

      t.timestamps
    end
  end
end
