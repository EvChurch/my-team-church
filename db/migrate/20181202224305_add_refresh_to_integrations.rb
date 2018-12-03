class AddRefreshToIntegrations < ActiveRecord::Migration[5.2]
  def change
    add_column :integrations, :encrypted_api_refresh_key, :string
    add_column :integrations, :encrypted_api_refresh_key_iv, :string
    add_column :integrations, :expires_at, :datetime
  end
end
