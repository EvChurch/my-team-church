class AddDescriptionToPositions < ActiveRecord::Migration[5.1]
  def change
    add_column :positions, :description, :text
  end
end
