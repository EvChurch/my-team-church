class CreateAccessPermissions < ActiveRecord::Migration[5.0]
  def change
    create_table :access_permissions, id: :uuid do |t|
      t.string :name
      t.timestamps
    end
  end
end
