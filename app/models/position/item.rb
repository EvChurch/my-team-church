class Position::Item < ApplicationRecord
  has_ancestry
  belongs_to :position
  validates :name, presence: true
end
