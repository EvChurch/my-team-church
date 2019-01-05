class AddKindToObjectiveKeyResults < ActiveRecord::Migration[5.2]
  def change
    add_column :objective_key_results, :kind, :string, default: 'key_result'
  end
end
