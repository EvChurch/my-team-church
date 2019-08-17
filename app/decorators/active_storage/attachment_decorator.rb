# frozen_string_literal: true

class ActiveStorage::AttachmentDecorator < ApplicationDecorator
  def url
    helpers.polymorphic_url(object)
  end
end
