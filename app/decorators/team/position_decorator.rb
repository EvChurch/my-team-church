# frozen_string_literal: true

class Team::PositionDecorator < ApplicationDecorator
  decorates_association :people
end
