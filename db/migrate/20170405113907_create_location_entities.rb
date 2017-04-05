class CreateLocationEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :location_entities, id: :uuid do |t|
      t.uuid :location_id
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
  end
end
