class AddTrainingDescriptionToPositions < ActiveRecord::Migration[5.2]
  def change
    add_column :positions, :training_description, :text
  end
end
