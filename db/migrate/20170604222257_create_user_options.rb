class CreateUserOptions < ActiveRecord::Migration
  def change
    create_table :user_options, id: :uuid do |t|
      t.references :user, type: :uuid
      t.string :key
      t.string :value

      t.timestamps null: false
    end
    add_index :user_options, %i[user_id key], unique: true
  end
end