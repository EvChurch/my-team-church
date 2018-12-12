# frozen_string_literal: true

class Team::Position::Entity < ApplicationRecord
  belongs_to :position, inverse_of: :entities
  belongs_to :person, inverse_of: :position_entities
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  scope :active, lambda {
    where(start_at: nil, end_at: nil)
      .or(where('start_at <= :now AND end_at IS NULL', now: Time.current))
      .or(where('start_at IS NULL AND end_at >= :now', now: Time.current))
      .or(where('start_at <= :now AND end_at >= :now', now: Time.current))
  }
end
