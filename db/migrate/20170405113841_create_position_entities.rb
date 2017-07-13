class CreatePositionEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :position_entities, id: :uuid do |t|
      t.references :position, foreign_key: true, type: :uuid
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
    add_index :position_entities, %i[resource_type resource_id]
  end
end
