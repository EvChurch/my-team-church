class CreateServiceTypeConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :service_type_connections, id: :uuid do |t|
      t.uuid :resource_id
      t.string :resource_type
      t.belongs_to :service_type, foreign_key: { on_delete: :cascade, to_table: :service_types }, type: :uuid

      t.timestamps
    end

    add_index :service_type_connections,
              [:resource_id, :resource_type, :service_type_id],
              name: 'index_service_type_connections_on_resource_and_service_type_id',
              unique: true
  end
end
