# frozen_string_literal: true

class Team::Leader::Assignee < ApplicationRecord
  belongs_to :leader, class_name: 'Team::Leader'
  belongs_to :entity, class_name: 'Team::Position::Entity'
end
