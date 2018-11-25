# frozen_string_literal: true

class Integration::Elvanto::AuthenticateService
  class Unauthorized < StandardError; end

  attr_accessor :integration

  def self.get_authentication_cookies(integration)
    new(integration).get_authentication_cookies
  end

  def initialize(integration)
    @integration = integration
  end

  def get_authentication_cookies
    response = HTTParty.post("https://#{integration.domain}/login/",
      body: {
        login_username: integration.username,
        login_password: integration.password,
        login_to: 'admin'
      },
      follow_redirects: false
    )
    cookies = HTTParty::CookieHash.new
    raise Unauthorized if response.get_fields('Set-Cookie').nil?
    response.get_fields('Set-Cookie').each { |c| cookies.add_cookies(c) }
    cookies.to_cookie_string
  end
end
