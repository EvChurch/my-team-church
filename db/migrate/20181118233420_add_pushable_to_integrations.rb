class AddPushableToIntegrations < ActiveRecord::Migration[5.2]
  def change
    add_column :integrations, :pushable, :boolean, default: false
  end
end
