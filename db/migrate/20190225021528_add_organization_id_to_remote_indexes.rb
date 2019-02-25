class AddOrganizationIdToRemoteIndexes < ActiveRecord::Migration[5.2]
  def change
    remove_index :teams, column: %i[remote_id remote_source]
    add_index :teams,
              %i[organization_id remote_id remote_source],
              name: 'teams_remote_idx',
              unique: true

    remove_index :team_positions, column: %i[remote_id remote_source]
    add_index :team_positions,
              %i[team_id remote_id remote_source],
              name: 'team_positions_remote_idx',
              unique: true

    remove_index :departments, column: %i[remote_id remote_source]
    add_index :departments,
              %i[organization_id remote_id remote_source],
              name: 'departments_remote_idx',
              unique: true

    remove_index :people, column: %i[remote_id remote_source]
    add_index :people,
              %i[organization_id remote_id remote_source],
              name: 'people_remote_idx',
              unique: true
  end
end
