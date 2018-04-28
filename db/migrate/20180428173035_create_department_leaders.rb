class CreateDepartmentLeaders < ActiveRecord::Migration[5.1]
  def change
    create_table :department_leaders, id: :uuid do |t|
      t.references :person, type: :uuid, foreign_key: true
      t.references :department, type: :uuid, foreign_key: true

      t.timestamps
    end

    add_index :department_leaders, [:person_id, :department_id], unique: true
  end
end
