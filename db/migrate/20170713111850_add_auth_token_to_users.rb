# frozen_string_literal: true

class AddAuthTokenToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :token, :string
    add_index :users, :token, unique: true
  end
end
