class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations, id: :uuid do |t|
      t.references :organization, foreign_key: true, type: :uuid
      t.string :name

      t.timestamps
    end
  end
end
