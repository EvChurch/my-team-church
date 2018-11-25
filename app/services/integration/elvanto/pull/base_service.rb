# frozen_string_literal: true

class Integration::Elvanto::Pull::BaseService
  attr_accessor :integration, :organization

  def self.pull(integration)
    new(integration).pull
  end

  def initialize(integration)
    @integration = integration
    @organization = integration.organization
  end

  def pull
    collection.map(&method(:import_record))
  end

  def collection
    @collection ||= data_from_page(
      "admin/settings/#{self.class::COLLECTION}"
    )[self.class::COLLECTION].map(&method(:record_details))
  end

  protected

  def record_details(record)
    data_from_page("admin/settings/#{self.class::COLLECTION}/#{record['id']}")
  end

  def import_record(record)
    local_record = organization.send(self.class::LOCAL_COLLECTION).find_or_initialize_by(
      remote_id: record['id'], remote_source: 'elvanto'
    )
    local_record.attributes = local_attributes(record)
    local_record.save!
    local_record
  end

  def local_attributes(_record)
    {}
  end

  def cookies
    @cookies ||= Integration::Elvanto::AuthenticateService.get_authentication_cookies(integration)
  end

  def data_from_page(path)
    response = Nokogiri::HTML(HTTParty.get("https://#{integration.domain}/#{path}", headers: { 'Cookie' => cookies }))
    JSON.parse(
      response.at('script:contains("PageData")').text.delete_prefix('var PageData = ').delete_suffix(';')
    )['view']
  end
end
