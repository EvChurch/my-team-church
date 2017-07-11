class CreateObjectiveKeyResults < ActiveRecord::Migration[5.0]
  def change
    create_table :objective_key_results, id: :uuid do |t|
      t.references :objective, type: :uuid, foreign_key: true
      t.string :name, null: false
      t.text :description, null: false
      t.string :result_type, default: '%', null: false
      t.decimal :start_value, default: 0
      t.decimal :target_value, default: 100
      t.decimal :weight, default: 1

      t.timestamps
    end
  end
end
