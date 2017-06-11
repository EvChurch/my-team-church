class Organization < ApplicationRecord
  resourcify

  def self.from_url(url)
    find_by!(subdomain: url_to_subdomain(url))
  end
end
