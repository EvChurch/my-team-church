# frozen_string_literal: true

class Team::Position::Entity < ApplicationRecord
  include Pushable

  belongs_to :position, inverse_of: :entities
  belongs_to :person, inverse_of: :position_entities
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  has_many :assignees, dependent: :destroy, inverse_of: :entity, class_name: 'Team::Leader::Assignee'
  has_many :leaders, through: :assignees
  scope :active, lambda {
    where(start_at: nil, end_at: nil)
      .or(where('start_at <= :now AND end_at IS NULL', now: Time.current))
      .or(where('start_at IS NULL AND end_at >= :now', now: Time.current))
      .or(where('start_at <= :now AND end_at >= :now', now: Time.current))
      .kept
  }
  scope :kept, -> { undiscarded.joins(:position, :person).merge(Team::Position.kept).merge(Person.kept) }
  delegate :organization, to: :position
end
