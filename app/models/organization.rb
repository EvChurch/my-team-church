class Organization < ApplicationRecord
  resourcify
  validates :name, :subdomain, presence: true

  def self.from_url(url)
    find_by!(subdomain: url_to_subdomain(url))
  end
end
