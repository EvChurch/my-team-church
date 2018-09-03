class AddDatesToObjectiveKeyResults < ActiveRecord::Migration[5.2]
  def change
    add_column :objective_key_results, :start_at, :timestamp
    add_column :objective_key_results, :end_at, :timestamp
  end
end
