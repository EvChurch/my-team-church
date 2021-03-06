# frozen_string_literal: true

class Team::Position::EntityDecorator < ApplicationDecorator
  delegate :name, to: :position
  decorates_association :person
  decorates_association :position
  decorates_association :leaders
end
