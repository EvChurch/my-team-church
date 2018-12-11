class AddForeignKeys < ActiveRecord::Migration[5.2]
  def up
    add_foreign_key    :departments, :organizations, on_delete: :cascade
    remove_foreign_key :teams, :organizations
    add_foreign_key    :teams, :organizations, on_delete: :cascade
    remove_foreign_key :teams, :organizations
    add_foreign_key    :teams, :organizations, on_delete: :cascade
    add_foreign_key    :users_roles, :users, on_delete: :cascade
    add_foreign_key    :users_roles, :roles, on_delete: :cascade
  end
end
