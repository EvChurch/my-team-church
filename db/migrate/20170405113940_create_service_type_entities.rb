class CreateServiceTypeEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :service_type_entities, id: :uuid do |t|
      t.uuid :service_type_id
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
  end
end
