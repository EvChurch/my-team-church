# frozen_string_literal: true

require 'elvanto'

class Integration::Elvanto < Integration
  validates :api_key, :username, :password, :domain, presence: true
  validate :validate_domain
  validate :validate_api_key
  validate :validate_username_and_password

  def active
    api_key_valid? && username_and_password_valid?
  end

  protected

  def domain_valid?
    HTTParty.get "https://#{domain}/login/"
    true
  rescue SocketError
    false
  end

  def api_key_valid?
    ElvantoAPI.configure(api_key: api_key)
    ElvantoAPI.call('people/getAll')
    true
  rescue ElvantoAPI::Unauthorized
    false
  end

  def username_and_password_valid?
    Integration::Elvanto::AuthenticateService.get_authentication_cookies(self)
    true
  rescue Integration::Elvanto::AuthenticateService::Unauthorized
    false
  end

  def validate_domain
    return if domain_valid?

    errors.add(:domain, 'Invalid Domain')
  end

  def validate_api_key
    return if api_key_valid?

    errors.add(:api_key, 'Invalid API Key')
    false
  end

  def validate_username_and_password
    return unless domain_valid?
    return if username_and_password_valid?

    errors.add(:username, 'Invalid Username or Password')
    errors.add(:password, 'Invalid Username or Password')
    false
  end
end
