# frozen_string_literal: true

class ServiceType::ConnectionDecorator < ApplicationDecorator
  decorates_association :resource
  decorates_association :service_type
end
