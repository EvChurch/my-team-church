# frozen_string_literal: true

class Team < ApplicationRecord
  belongs_to :organization, required: true
  has_many :team_links, dependent: :destroy
  has_many :departments, through: :team_links
  validates :name, :departments, presence: true
end
