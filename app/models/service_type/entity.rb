# frozen_string_literal: true

class ServiceType::Entity < ApplicationRecord
  belongs_to :service_type
  belongs_to :resource, polymorphic: true
end
