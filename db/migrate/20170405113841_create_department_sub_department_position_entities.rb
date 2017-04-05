class CreateDepartmentSubDepartmentPositionEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :department_sub_department_position_entities, id: :uuid do |t|
      t.uuid :position_id
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
  end
end
