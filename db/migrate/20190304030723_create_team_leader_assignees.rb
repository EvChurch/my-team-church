class CreateTeamLeaderAssignees < ActiveRecord::Migration[5.2]
  def change
    create_table :team_leader_assignees, id: :uuid do |t|
      t.belongs_to :leader, foreign_key: { to_table: 'team_leaders', on_delete: :cascade }, type: :uuid
      t.belongs_to :entity, foreign_key: { to_table: 'team_position_entities', on_delete: :cascade }, type: :uuid

      t.timestamps
    end
  end
end
