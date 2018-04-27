class CreateUserLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :user_links, id: :uuid do |t|
      t.references :person, type: :uuid, foreign_key: true
      t.references :organization, type: :uuid, foreign_key: true
      t.references :user, type: :uuid, foreign_key: true

      t.timestamps
    end

    add_index :user_links, [:organization_id, :user_id], unique: true
  end
end
