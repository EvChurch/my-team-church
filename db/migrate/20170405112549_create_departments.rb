class CreateDepartments < ActiveRecord::Migration[5.0]
  def change
    create_table :departments, id: :uuid do |t|
      t.string :name
      t.timestamps
    end
  end
end
