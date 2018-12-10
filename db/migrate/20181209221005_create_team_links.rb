class CreateTeamLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :team_links, id: :uuid do |t|
      t.belongs_to :team, foreign_key: true, type: :uuid
      t.belongs_to :department, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
