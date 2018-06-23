class CreatePositionEntityServiceTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :position_entity_service_types, id: :uuid do |t|
      t.belongs_to :entity, foreign_key: { on_delete: :cascade, to_table: :position_entities }, type: :uuid
      t.belongs_to :service_type, foreign_key: { on_delete: :cascade }, type: :uuid
      t.timestamps
    end
  end
end
