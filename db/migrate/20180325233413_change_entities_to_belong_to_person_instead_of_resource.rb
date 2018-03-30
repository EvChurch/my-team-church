class ChangeEntitiesToBelongToPersonInsteadOfResource < ActiveRecord::Migration[5.1]
  ENTITIES = %i[
    access_permission_entities demographic_entities location_entities position_entities service_type_entities
  ]

  def change
    ENTITIES.each do |sym|
      remove_index sym, column: [:resource_type, :resource_id]
      rename_column sym, :resource_id, :person_id
      remove_column sym, :resource_type
      add_foreign_key sym, :people
    end
  end
end
