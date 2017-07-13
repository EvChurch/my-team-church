# frozen_string_literal: true

class Position
  class Entity < ApplicationRecord
    belongs_to :position
    belongs_to :resource, polymorphic: true
  end
end
