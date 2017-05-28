class CreateSubDepartments < ActiveRecord::Migration[5.0]
  def change
    create_table :sub_departments, id: :uuid do |t|
      t.references :organization, index: true, type: :uuid
      t.references :department, index: true, type: :uuid
      t.string :name

      t.timestamps
    end
  end
end