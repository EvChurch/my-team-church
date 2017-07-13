# frozen_string_literal: true

class AddConfiguredToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :configured, :boolean
  end
end
