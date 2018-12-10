# frozen_string_literal: true

class TeamDecorator < ApplicationDecorator
  decorates_association :departments
  decorates_association :positions
end
