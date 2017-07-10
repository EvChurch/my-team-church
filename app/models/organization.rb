class Organization < ApplicationRecord
  has_many :integrations, dependent: :destroy
  accepts_nested_attributes_for :integrations

  resourcify
  validates :name, :subdomain, presence: true
  validates :subdomain, uniqueness: true

  def self.from_url(url)
    find_by!(subdomain: url_to_subdomain(url))
  end
end
