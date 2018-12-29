class AddUniqueIndexToTeamLinks < ActiveRecord::Migration[5.2]
  def change
    add_index :team_links, %i[team_id department_id], unique: true
  end
end
