class Organization < ApplicationRecord
  has_many :integrations, dependent: :destroy
  has_many :access_permissions, dependent: :destroy
  has_many :demographics, dependent: :destroy
  has_many :departments, dependent: :destroy
  has_many :locations, dependent: :destroy
  has_many :people, dependent: :destroy
  has_many :positions, dependent: :destroy
  has_many :service_types, dependent: :destroy
  has_many :sub_departments, dependent: :destroy
  has_many :objectives, as: :resource, dependent: :destroy

  accepts_nested_attributes_for :integrations

  resourcify
  validates :name, :subdomain, presence: true
  validates :subdomain, uniqueness: true

  def self.from_url(url)
    find_by!(subdomain: url_to_subdomain(url))
  end
end
