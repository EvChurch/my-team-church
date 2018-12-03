# frozen_string_literal: true

require 'elvanto'

class Integration::Fluro < Integration
  validates :username, :password, presence: true, if: -> { api_key.nil? }
  validate :validate_username_and_password


  def active
    if expires_at && Time.zone.now > expires_at
      update(Integration::Fluro::AuthenticateService.refresh_access_token(self))
    end
    true
  rescue Integration::Fluro::AuthenticateService::Unauthorized
    false
  end

  protected

  def validate_username_and_password
    assign_attributes(Integration::Fluro::AuthenticateService.fetch_access_token(self))
  rescue Integration::Fluro::AuthenticateService::Unauthorized
    errors.add(:username, 'Invalid Username or Password')
    errors.add(:password, 'Invalid Username or Password')
    false
  end
end
