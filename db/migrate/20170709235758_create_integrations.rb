# frozen_string_literal: true

class CreateIntegrations < ActiveRecord::Migration[5.0]
  def change
    create_table :integrations, id: :uuid do |t|
      t.string :type
      t.references :organization, foreign_key: true, type: :uuid
      t.string :client_id
      t.string :client_secret
      t.string :api_key

      t.timestamps
    end
    add_index :integrations, %i[organization_id type], unique: true
  end
end
