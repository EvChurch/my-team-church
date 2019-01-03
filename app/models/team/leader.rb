# frozen_string_literal: true

class Team::Leader < ApplicationRecord
  belongs_to :person
  belongs_to :team
  validates :person_id, uniqueness: { scope: :team_id }
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
end
