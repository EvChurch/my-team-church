class AddCurrentValueToObjectiveKeyResults < ActiveRecord::Migration[5.1]
  def change
    add_column :objective_key_results, :current_value, :decimal, default: 0
  end
end
