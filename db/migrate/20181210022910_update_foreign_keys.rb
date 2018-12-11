class UpdateForeignKeys < ActiveRecord::Migration[5.2]
  def up
    remove_foreign_key :department_leaders, :departments
    add_foreign_key    :department_leaders, :departments, on_delete: :cascade
    remove_foreign_key :department_leaders, :people
    add_foreign_key    :department_leaders, :people, on_delete: :cascade
    remove_foreign_key :objective_key_results, :objectives
    add_foreign_key    :objective_key_results, :objectives, on_delete: :cascade
    remove_foreign_key :team_links, :departments
    add_foreign_key    :team_links, :departments, on_delete: :cascade
    remove_foreign_key :team_links, :teams
    add_foreign_key    :team_links, :teams, on_delete: :cascade
    remove_foreign_key :team_position_entities, :people
    add_foreign_key    :team_position_entities, :people, on_delete: :cascade
    remove_foreign_key :team_position_entities, :team_positions
    add_foreign_key    :team_position_entities, :team_positions, column: 'position_id', on_delete: :cascade
    remove_foreign_key :team_position_items, :team_positions
    add_foreign_key    :team_position_items, :team_positions, column: 'position_id', on_delete: :cascade
    remove_column      :team_positions, :organization_id
    remove_foreign_key :user_links, :organizations
    add_foreign_key    :user_links, :organizations, on_delete: :cascade
    remove_foreign_key :user_links, :people
    add_foreign_key    :user_links, :people, on_delete: :cascade
    remove_foreign_key :user_links, :users
    add_foreign_key    :user_links, :users, on_delete: :cascade
    remove_foreign_key :user_options, :users
    add_foreign_key    :user_options, :users, on_delete: :cascade
    drop_table :objective_links
  end
end
