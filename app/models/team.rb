# frozen_string_literal: true

class Team < ApplicationRecord
  include Pushable

  belongs_to :organization, required: true
  has_many :team_links, class_name: 'Team::Link', dependent: :destroy
  has_many :departments, through: :team_links
  has_many :positions, dependent: :destroy
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  validates :name, :departments, presence: true
end
