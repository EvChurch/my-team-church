class AddUniquenessToTeamPositionEntities < ActiveRecord::Migration[5.2]
  disable_ddl_transaction!

  def up
    results = execute <<-SQL
      SELECT array_agg(id)
      FROM team_position_entities
      GROUP BY person_id, position_id
      HAVING array_agg(id)::text LIKE '%,%'
    SQL
    ids = results.map do |result|
      ids = result['array_agg'].tr('{}', '').split(',')
      ids.delete_at 0
      ids
    end
    Team::Position::Entity.where(id: ids.flatten).delete_all
    add_index :team_position_entities, %i[position_id person_id], unique: true, algorithm: :concurrently
  end

  def down
    remove_index :team_position_entities, %i[position_id person_id]
  end
end
