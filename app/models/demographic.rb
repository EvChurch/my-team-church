class Demographic < ApplicationRecord
  include ElvantoCollection
  validates :name, presence: true
  has_many :entities, class_name: 'Demographic::Entity'
  has_many :resources, through: :entities
  default_scope -> { order(:name) }
end
