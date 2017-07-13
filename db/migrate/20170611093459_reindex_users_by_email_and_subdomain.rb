# frozen_string_literal: true

class ReindexUsersByEmailAndSubdomain < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :subdomain, :string
    remove_index :users, :email
    add_index :users, %i[email subdomain], unique: true
  end

  def down
    remove_column :users, :subdomain
    remove_index :users, %i[email subdomain]
    add_index :users, :email, unique: true
  end
end
