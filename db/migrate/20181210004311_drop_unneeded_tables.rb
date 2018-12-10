class DropUnneededTables < ActiveRecord::Migration[5.2]
  def up
    drop_table :access_permission_entities
    drop_table :access_permissions
    drop_table :demographic_entities
    drop_table :demographics
    drop_table :location_entities
    drop_table :locations
    drop_table :service_type_connections
    drop_table :service_type_entities
    drop_table :service_types
  end
end
