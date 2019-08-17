# frozen_string_literal: true

module Concerns::SetCurrentHostForDiskService
  extend ActiveSupport::Concern

  included do
    before_action :set_current_host_for_disk_service, if: -> { Rails.env.development? }
  end

  private

  def set_current_host_for_disk_service
    ActiveStorage::Current.host = request.base_url
  end
end
