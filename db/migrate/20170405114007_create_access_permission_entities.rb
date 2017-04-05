class CreateAccessPermissionEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :access_permission_entities, id: :uuid do |t|
      t.uuid :access_permission_id
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
  end
end
