class AddDiscardedAt < ActiveRecord::Migration[5.2]
  def change
    add_column :departments, :discarded_at, :datetime
    add_index :departments, :discarded_at
    add_column :positions, :discarded_at, :datetime
    add_index :positions, :discarded_at
    add_column :people, :discarded_at, :datetime
    add_index :people, :discarded_at
  end
end
