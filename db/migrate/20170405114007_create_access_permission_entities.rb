# frozen_string_literal: true

class CreateAccessPermissionEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :access_permission_entities, id: :uuid do |t|
      t.references :access_permission, foreign_key: true, type: :uuid
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
    add_index :access_permission_entities,
              %i[resource_type resource_id],
              name: 'index_access_permission_entities_on_resource'
  end
end
