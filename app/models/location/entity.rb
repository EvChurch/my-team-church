# frozen_string_literal: true

class Location::Entity < ApplicationRecord
  belongs_to :location, inverse_of: :locations
  belongs_to :resource, polymorphic: true
end
