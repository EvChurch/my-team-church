class CreateLocationEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :location_entities, id: :uuid do |t|
      t.references :location, index: true, type: :uuid
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
    add_index :location_entities, %i[resource_type resource_id]
  end
end
