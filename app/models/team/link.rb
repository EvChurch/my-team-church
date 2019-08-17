# frozen_string_literal: true

class Team::Link < ApplicationRecord
  belongs_to :team, optional: false
  belongs_to :department, optional: false
  validates :team_id, uniqueness: { scope: :department_id }
  delegate :organization, to: :team
end
