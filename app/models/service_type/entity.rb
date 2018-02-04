# frozen_string_literal: true

class ServiceType::Entity < ApplicationRecord
  belongs_to :service_type, inverse_of: :service_types
  belongs_to :resource, polymorphic: true
end
