class AddCredentialsToIntegrations < ActiveRecord::Migration[5.2]
  def change
    add_column :integrations, :username, :string
    add_column :integrations, :encrypted_password, :string
    add_column :integrations, :encrypted_password_iv, :string
    add_column :integrations, :encrypted_api_key, :string
    add_column :integrations, :encrypted_api_key_iv, :string
    add_column :integrations, :domain, :string
    remove_column :integrations, :api_key, :string
  end
end
