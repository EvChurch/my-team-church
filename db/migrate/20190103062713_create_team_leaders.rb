class CreateTeamLeaders < ActiveRecord::Migration[5.1]
  def change
    create_table :team_leaders, id: :uuid do |t|
      t.references :person, type: :uuid, foreign_key: true
      t.references :team, type: :uuid, foreign_key: true
      t.datetime :discarded_at, index: true
      t.timestamps
    end

    add_index :team_leaders, %i[person_id team_id], unique: true
  end
end
