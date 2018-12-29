class AddUniqueIndexToTeamPositionEntities < ActiveRecord::Migration[5.2]
  def change
    add_index :team_position_entities, %i[position_id person_id], unique: true
  end
end
