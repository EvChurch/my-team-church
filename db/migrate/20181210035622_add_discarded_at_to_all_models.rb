class AddDiscardedAtToAllModels < ActiveRecord::Migration[5.2]
  def change
    add_column :department_leaders, :discarded_at, :datetime
    add_index :department_leaders, :discarded_at
    add_column :integrations, :discarded_at, :datetime
    add_index :integrations, :discarded_at
    add_column :objective_key_results, :discarded_at, :datetime
    add_index :objective_key_results, :discarded_at
    add_column :objectives, :discarded_at, :datetime
    add_index :objectives, :discarded_at
    add_column :organizations, :discarded_at, :datetime
    add_index :organizations, :discarded_at
    add_column :roles, :discarded_at, :datetime
    add_index :roles, :discarded_at
    add_column :team_links, :discarded_at, :datetime
    add_index :team_links, :discarded_at
    add_column :team_position_entities, :discarded_at, :datetime
    add_index :team_position_entities, :discarded_at
    add_column :team_position_items, :discarded_at, :datetime
    add_index :team_position_items, :discarded_at
    add_column :teams, :discarded_at, :datetime
    add_index :teams, :discarded_at
    add_column :user_links, :discarded_at, :datetime
    add_index :user_links, :discarded_at
    add_column :user_options, :discarded_at, :datetime
    add_index :user_options, :discarded_at
    add_column :users, :discarded_at, :datetime
    add_index :users, :discarded_at
    add_column :users_roles, :discarded_at, :datetime
    add_index :users_roles, :discarded_at
  end
end
