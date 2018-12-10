class ChangePositionsToTeams < ActiveRecord::Migration[5.2]
  def up
    remove_column :positions, :department_id
    add_column :positions, :team_id, :uuid, index: true
    add_foreign_key :positions, :teams, on_delete: :cascade
  end
end
