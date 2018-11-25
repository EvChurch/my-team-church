# frozen_string_literal: true

class Integration::Elvanto::Pull::LocationService < Integration::Elvanto::Pull::BaseService
  LOCAL_COLLECTION = COLLECTION = 'locations'

  protected

  def local_attributes(location)
    {
      name: location['title']
    }
  end
end
