class Location
  class Entity < ApplicationRecord
    belongs_to :location
    belongs_to :resource, polymorphic: true
  end
end
