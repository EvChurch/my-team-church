# frozen_string_literal: true

class CreateAccessPermissions < ActiveRecord::Migration[5.0]
  def change
    create_table :access_permissions, id: :uuid do |t|
      t.references :organization, index: true, type: :uuid
      t.string :name
      t.timestamps
    end
  end
end
