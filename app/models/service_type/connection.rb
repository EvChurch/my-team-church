# frozen_string_literal: true

class ServiceType::Connection < ApplicationRecord
  belongs_to :resource, polymorphic: true
  belongs_to :service_type
  validates :service_type_id, uniqueness: { scope: %i[resource_id resource_type] }
end
