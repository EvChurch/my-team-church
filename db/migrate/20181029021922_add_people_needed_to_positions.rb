class AddPeopleNeededToPositions < ActiveRecord::Migration[5.2]
  def change
    add_column :positions, :people_needed, :integer, default: 0
  end
end
