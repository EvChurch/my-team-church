# frozen_string_literal: true

class Location::Entity < ApplicationRecord
  belongs_to :location
  belongs_to :resource, polymorphic: true
end
