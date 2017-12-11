# frozen_string_literal: true

class Position
  class EntityDecorator < ApplicationDecorator
    delegate :name, to: :position
  end
end
