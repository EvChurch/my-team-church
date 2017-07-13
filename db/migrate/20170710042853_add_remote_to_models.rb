class AddRemoteToModels < ActiveRecord::Migration[5.0]
  def change
    add_column :access_permissions, :remote_id, :string
    add_column :access_permissions, :remote_source, :string
    add_index :access_permissions, %i[remote_id remote_source], unique: true
    add_column :demographics, :remote_id, :string
    add_column :demographics, :remote_source, :string
    add_index :demographics, %i[remote_id remote_source], unique: true
    add_column :locations, :remote_id, :string
    add_column :locations, :remote_source, :string
    add_index :locations, %i[remote_id remote_source], unique: true
    add_column :service_types, :remote_id, :string
    add_column :service_types, :remote_source, :string
    add_index :service_types, %i[remote_id remote_source], unique: true
    add_column :departments, :remote_id, :string
    add_column :departments, :remote_source, :string
    add_index :departments, %i[remote_id remote_source], unique: true
    add_column :positions, :remote_id, :string
    add_column :positions, :remote_source, :string
    add_index :positions, %i[remote_id remote_source], unique: true
    add_column :people, :remote_id, :string
    add_column :people, :remote_source, :string
    add_index :people, %i[remote_id remote_source], unique: true
  end
end
