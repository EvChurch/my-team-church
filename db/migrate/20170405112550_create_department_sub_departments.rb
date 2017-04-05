class CreateDepartmentSubDepartments < ActiveRecord::Migration[5.0]
  def change
    create_table :department_sub_departments, id: :uuid do |t|
      t.uuid :department_id
      t.string :name

      t.timestamps
    end
  end
end
