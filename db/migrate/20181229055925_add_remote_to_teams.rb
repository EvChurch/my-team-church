class AddRemoteToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :remote_id, :string
    add_column :teams, :remote_source, :string
    add_index :teams, %i[remote_id remote_source], unique: true
  end
end
