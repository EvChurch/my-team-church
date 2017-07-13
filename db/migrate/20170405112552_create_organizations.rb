class CreateOrganizations < ActiveRecord::Migration[5.0]
  def change
    create_table :organizations, id: :uuid do |t|
      t.string :name
      t.string :api_key
      t.string :client_id
      t.string :client_secret
      t.string :primary_color
      t.string :secondary_color
      t.string :subdomain

      t.timestamps
    end
  end
end
