class CreateGoals < ActiveRecord::Migration[5.0]
  def change
    create_table :goals, id: :uuid do |t|
      t.uuid :resource_id
      t.string :resource_type
      t.string :name
      t.text :description
      t.date :estimated_completion
      t.integer :kind
      t.integer :amount_kind
      t.decimal :amount

      t.timestamps
    end
  end
end
