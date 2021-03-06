# frozen_string_literal: true

class CreatePositions < ActiveRecord::Migration[5.0]
  def change
    create_table :positions, id: :uuid do |t|
      t.references :organization, foreign_key: true, type: :uuid
      t.references :department, foreign_key: true, type: :uuid
      t.string :name

      t.timestamps
    end
  end
end
