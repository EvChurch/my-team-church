class Demographic < ApplicationRecord
  belongs_to :organization
  has_many :entities, class_name: 'Demographic::Entity', dependent: :destroy
  has_many :resources, through: :entities
  validates :name, presence: true
  default_scope -> { order(:name) }
end
