class RenamePositionsTable < ActiveRecord::Migration[5.2]
  def change
    rename_table :positions, :team_positions
    rename_table :position_items, :team_position_items
    rename_table :position_entities, :team_position_entities
  end
end
