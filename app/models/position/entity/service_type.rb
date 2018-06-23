# frozen_string_literal: true

class Position::Entity::ServiceType < ApplicationRecord
  belongs_to :entity
  belongs_to :service_type
end
