# frozen_string_literal: true

class ServiceType::Entity < ApplicationRecord
  belongs_to :service_type, inverse_of: :entities
  belongs_to :person, inverse_of: :service_type_entities
end
