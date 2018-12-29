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
    return body.to_json if method == 'json'
    body
  end

  def headers(method)
    if method == 'json'
      return {
        'Cookie' => cookies,
        'Content-Type' => 'application/json',
        'Accept' => 'application/json'
      }
    end
    {
      'Cookie' => cookies,
      'Content-Type' => 'application/x-www-form-urlencoded'
    }
  end

  def csrf_token(url, method)
    response = Nokogiri::HTML(HTTParty.get(url, headers: { 'Cookie' => cookies }))
    if method == 'json'
      return JSON.parse(
        response.at('script:contains("PageData")').text.delete_prefix('var PageData = ').delete_suffix(';')
      )['view']['csrf_token']
    end
    response.at('input[name="csrf_token"]').attributes['value'].value
  end

  def cookies
    @cookies ||= Integration::Elvanto::AuthenticateService.get_authentication_cookies(integration)
  end
end
