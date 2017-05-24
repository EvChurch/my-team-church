class CreateServiceTypeEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :service_type_entities, id: :uuid do |t|
      t.references :service_type, index: true, type: :uuid
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
    add_index :service_type_entities, %i[resource_type resource_id]
  end
end
