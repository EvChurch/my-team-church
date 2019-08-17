# frozen_string_literal: true

class ActiveStorage::AttachmentDecorator < ApplicationDecorator
  def url
    object.service_url
  end
end
