
class WebRouterService
  class << self
    def root_url
      generate_url("/")
    end

    def invite_url(access_code)
      generate_url("/organizations/connect?access_code=#{access_code}")
    end

    def reset_password_url(token)
      generate_url("/reset_password?token=#{token}")
    end

    private

    def generate_url(path)
      protocol = Rails.env.production? ? 'https://' : 'http://'
      url = "app.#{ENV.fetch('DOMAIN_NAME')}"
      port = Rails.env.production? ? nil : ':3000'
      "#{protocol}#{url}#{port}#{path}"
    end
  end
end
