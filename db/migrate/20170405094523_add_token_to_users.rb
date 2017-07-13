# frozen_string_literal: true

class AddTokenToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :expires, :boolean
    add_column :users, :expires_at, :timestamp
    add_column :users, :refresh_token, :string
    add_column :users, :access_token, :string
  end
end
