# frozen_string_literal: true

class AddAncestryToDepartments < ActiveRecord::Migration[5.0]
  def change
    add_column :departments, :ancestry, :string
    add_index :departments, :ancestry
  end
end
