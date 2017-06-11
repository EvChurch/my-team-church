class AddSubdomainUniquenessToOrganizations < ActiveRecord::Migration[5.0]
  def change
    add_index :organizations, :subdomain, unique: true
  end
end
