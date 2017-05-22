class ServiceType < ApplicationRecord
  include ElvantoCollection
  validates :name, presence: true
  has_many :entities, class_name: 'ServiceType::Entity'
  has_many :resources, through: :entities
  default_scope -> { order(:name) }
end
