class Domain
  def self.matches?(request)
    request.subdomain.present?
  end
end
