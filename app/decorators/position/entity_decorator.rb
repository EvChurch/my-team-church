# frozen_string_literal: true

class Position::EntityDecorator < ApplicationDecorator
  delegate :name, to: :position
end
