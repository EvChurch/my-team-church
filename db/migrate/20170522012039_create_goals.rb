class CreateObjectives < ActiveRecord::Migration[5.0]
  def change
    create_table :objectives, id: :uuid do |t|
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
    add_index :objectives, %i[resource_type resource_id]
  end
end
