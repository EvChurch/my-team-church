# frozen_string_literal: true

class Integration::Elvanto::Push::BaseService
  attr_accessor :integration, :record, :action

  def self.push(integration, record, action)
    new(integration, record, action).send(action)
  end

  def initialize(integration, record, action)
    @integration = integration
    @record = record
    @action = action
  end

  protected

  def post(path, body, method = 'json')
    url = "https://#{integration.domain}/#{path}"
    HTTParty.post(
      url,
      headers: headers(method),
      body: payload(body.merge(csrf_token: csrf_token(url, method)), method)
    )
  end

  def payload(body, method)
    method == 'json' ? body.to_json : body
  end

  def headers(method)
    method == 'json' ? json_headers : default_headers
  end

  def json_headers
    {
      'Cookie' => cookies,
      'Content-Type' => 'application/json',
      'Accept' => 'application/json'
    }
  end

  def default_headers
    {
      'Cookie' => cookies,
      'Content-Type' => 'application/x-www-form-urlencoded'
    }
  end

  def csrf_token(url, method)
    response = Nokogiri::HTML(HTTParty.get(url, headers: { 'Cookie' => cookies }))
    method == 'json' ? extract_json_csrf_token(response) : extract_default_csrf_token(response)
  end

  def extract_json_csrf_token(response)
    JSON.parse(
      response.at('script:contains("PageData")').text.delete_prefix('var PageData = ').delete_suffix(';')
    )['view']['csrf_token']
  end

  def extract_default_csrf_token(response)
    response.at('input[name="csrf_token"]').attributes['value'].value
  end

  def cookies
    @cookies ||= Integration::Elvanto::AuthenticateService.get_authentication_cookies(integration)
  end
end
