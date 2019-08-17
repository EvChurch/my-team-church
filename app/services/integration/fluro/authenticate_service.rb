# frozen_string_literal: true

class Integration::Fluro::AuthenticateService
  class Unauthorized < StandardError; end

  attr_accessor :integration

  def self.fetch_access_token(integration)
    new(integration).fetch_access_token
  end

  def self.refresh_access_token(integration)
    new(integration).refresh_access_token
  end

  def initialize(integration)
    @integration = integration
  end

  def fetch_access_token
    response = token_login
    raise Unauthorized if response['status'] == 401

    {
      api_key: response['token'],
      api_refresh_key: response['refreshToken'],
      expires_at: Time.zone.parse(response['expires'])
    }
  end

  def refresh_access_token
    response = token_refresh
    raise Unauthorized if response == 'invalid_refresh_token'

    {
      api_key: response['token'],
      api_refresh_key: response['refreshToken'],
      expires_at: Time.zone.parse(response['expires'])
    }
  end

  private

  def token_refresh
    HTTParty.post(
      'https://api.fluro.io/token/refresh',
      body: {
        refreshToken: integration.api_refresh_key
      }
    )
  end

  def token_login
    HTTParty.post(
      'https://api.fluro.io/token/login',
      body: {
        username: integration.username,
        password: integration.password
      }
    )
  end
end
