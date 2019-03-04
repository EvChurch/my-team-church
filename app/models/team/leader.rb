# frozen_string_literal: true

class Team::Leader < ApplicationRecord
  belongs_to :person
  belongs_to :team
  validates :person_id, uniqueness: { scope: :team_id }
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  has_many :assignees, dependent: :destroy, inverse_of: :leader, class_name: 'Team::Leader::Assignee'
  delegate :organization, to: :team
end
