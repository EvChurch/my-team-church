# frozen_string_literal: true

class ServiceType
  class Entity < ApplicationRecord
    belongs_to :service_type
    belongs_to :resource, polymorphic: true
  end
end
