# frozen_string_literal: true

class Position::EntityDecorator < ApplicationDecorator
  delegate :name, to: :position
  decorates_association :person
  decorates_association :position
end
