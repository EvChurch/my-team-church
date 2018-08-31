class CreatePositionItems < ActiveRecord::Migration[5.2]
  def change
    create_table :position_items, id: :uuid do |t|
      t.string :name, null: false
      t.string :ancestry
      t.belongs_to :position, foreign_key: { on_delete: :cascade, to_table: :positions }, type: :uuid

      t.timestamps
    end
    add_index :position_items, :ancestry
  end
end
