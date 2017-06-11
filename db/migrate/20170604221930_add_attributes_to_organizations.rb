class AddAttributesToOrganizations < ActiveRecord::Migration[5.0]
  def change
    add_column :organizations, :website_url, :string
    add_column :organizations, :address_1, :string
    add_column :organizations, :address_2, :string
    add_column :organizations, :city, :string
    add_column :organizations, :state, :string
    add_column :organizations, :zip, :string
    add_column :organizations, :country, :string
    add_column :organizations, :time_zone, :string
  end
end
