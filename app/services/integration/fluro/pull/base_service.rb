# frozen_string_literal: true

class Integration::Fluro::Pull::BaseService
  attr_accessor :integration, :organization

  def self.pull(integration)
    new(integration).pull
  end

  def initialize(integration)
    @integration = integration
    @organization = integration.organization
  end

  def pull
    return unless integration.active
    collection.map(&method(:import_record))
  end

  def collection
    @collection ||= get(self.class::COLLECTION)
  end

  protected

  def get(path)
    HTTParty.get(
      "https://api.fluro.io/#{path}?access_token=#{integration.api_key}"
    )
  end
end
