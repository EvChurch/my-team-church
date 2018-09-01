class Position::Item < ApplicationRecord
  has_ancestry
  belongs_to :position
  acts_as_list scope: [:position_id, :ancestry], column: :order
  validates :name, presence: true
end
