class AddTermToPositionEntities < ActiveRecord::Migration[5.2]
  def change
    add_column :position_entities, :start_at, :timestamp
    add_column :position_entities, :end_at, :timestamp
    add_column :position_entities, :trial, :boolean, default: false
  end
end
