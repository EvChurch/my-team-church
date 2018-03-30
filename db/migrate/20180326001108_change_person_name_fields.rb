class ChangePersonNameFields < ActiveRecord::Migration[5.1]
  def change
    rename_column :people, :firstname, :first_name
    rename_column :people, :lastname, :last_name
  end
end
