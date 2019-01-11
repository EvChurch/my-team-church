# frozen_string_literal: true

class PersonDecorator < ApplicationDecorator
  decorates_association :organization
  decorates_association :position_entities
  decorates_association :users

  def name
    "#{first_name} #{last_name}".strip
  end

  def initials
    name.split.map { |w| w[0] }.join.upcase
  end

  def invite_url
    protocol = Rails.env.production? ? 'https://' : 'http://'
    url = "app.#{ENV.fetch('DOMAIN_NAME')}"
    port = Rails.env.production? ? nil : ':3000'
    "#{protocol}#{url}#{port}/organizations/connect?access_code=#{id}"
  end
end
