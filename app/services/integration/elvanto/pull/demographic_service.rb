# frozen_string_literal: true

class Integration::Elvanto::Pull::DemographicService < Integration::Elvanto::Pull::BaseService
  LOCAL_COLLECTION = COLLECTION = 'demographics'

  protected

  def local_attributes(demographic)
    {
      name: demographic['title']
    }
  end
end
