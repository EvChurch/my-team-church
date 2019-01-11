class AddInvitedAtToPeople < ActiveRecord::Migration[5.2]
  def change
    add_column :people, :invited_at, :timestamp
  end
end
