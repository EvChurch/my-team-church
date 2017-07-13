# frozen_string_literal: true

class CreateObjectiveLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :objective_links, id: :uuid do |t|
      t.references :parent, type: :uuid, foreign_key: { to_table: :objectives }
      t.references :child, type: :uuid, foreign_key: { to_table: :objectives }
      t.timestamps
    end

    add_index :objective_links, %i[parent_id child_id], unique: true
  end
end
