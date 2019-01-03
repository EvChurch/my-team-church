# frozen_string_literal: true

class Team::LeaderDecorator < ApplicationDecorator
  decorates_association :person
  decorates_association :team
end
