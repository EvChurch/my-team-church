class CreateDemographicEntities < ActiveRecord::Migration[5.0]
  def change
    create_table :demographic_entities, id: :uuid do |t|
      t.uuid :demographic_id
      t.uuid :resource_id
      t.string :resource_type
      t.timestamps
    end
  end
end
