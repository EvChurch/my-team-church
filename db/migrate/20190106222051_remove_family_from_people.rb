class RemoveFamilyFromPeople < ActiveRecord::Migration[5.2]
  def change
    remove_column :people, :family, :string
  end
end
