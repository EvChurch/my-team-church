# frozen_string_literal: true

require 'elvanto'

class Integration::Elvanto < Integration
  validates :client_id, :client_secret, :api_key, presence: true
  validate :validate_api_key
  validate :validate_client_credentials

  def validate_api_key
    ElvantoAPI.configure(api_key: api_key)
    ElvantoAPI.call('people/getAll')
  rescue ElvantoAPI::Unauthorized
    errors.add(:api_key, 'Invalid API Key')
  end

  def validate_client_credentials
    # ElvantoAPI.authorize_url(client_id, redirect_uri, scope, state)
  end
end
