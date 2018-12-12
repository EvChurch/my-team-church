# frozen_string_literal: true

class Team::Position::Item < ApplicationRecord
  has_ancestry
  belongs_to :position
  acts_as_list scope: %i[position_id ancestry], column: :order
  validates :name, presence: true
end
