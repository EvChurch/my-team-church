class CreatePositions < ActiveRecord::Migration[5.0]
  def change
    create_table :positions, id: :uuid do |t|
      t.references :organization, index: true, type: :uuid
      t.references :sub_department, index: true, type: :uuid
      t.string :name

      t.timestamps
    end
  end
end
