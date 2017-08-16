# frozen_string_literal: true

class AddDescriptionToDepartments < ActiveRecord::Migration[5.1]
  def change
    add_column :departments, :description, :text
  end
end
