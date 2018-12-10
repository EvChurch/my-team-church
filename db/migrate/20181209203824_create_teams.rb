class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams, id: :uuid do |t|
      t.belongs_to :organization, foreign_key: true, type: :uuid
      t.string :name

      t.timestamps
    end
  end
end
