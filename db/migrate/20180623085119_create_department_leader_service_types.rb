class CreateDepartmentLeaderServiceTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :department_leader_service_types, id: :uuid do |t|
      t.belongs_to :leader, foreign_key: { on_delete: :cascade, to_table: :department_leaders }, type: :uuid
      t.belongs_to :service_type, foreign_key: { on_delete: :cascade, to_table: :service_types }, type: :uuid

      t.timestamps
    end
  end
end
