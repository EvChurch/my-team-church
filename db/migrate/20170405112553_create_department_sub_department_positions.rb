class CreateDepartmentSubDepartmentPositions < ActiveRecord::Migration[5.0]
  def change
    create_table :department_sub_department_positions, id: :uuid do |t|
      t.string :name
      t.uuid :sub_department_id

      t.timestamps
    end
  end
end
