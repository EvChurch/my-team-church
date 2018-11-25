# frozen_string_literal: true

class Integration::Elvanto::Pull::AccessPermissionService < Integration::Elvanto::Pull::BaseService
  LOCAL_COLLECTION = 'access_permissions'
  COLLECTION = 'access'

  protected

  def local_attributes(access_permission)
    {
      name: access_permission['title']
    }
  end

  def collection
    return @collection if @collection

    response = Nokogiri::HTML(
      HTTParty.get(
        "https://#{integration.domain}/admin/settings/access/?load_data=1",
        headers: { 'Cookie' => cookies }
      )
    )
    @collection = JSON.parse(response)['results']
  end
end
