class AccessPermission < ApplicationRecord
  include ElvantoCollection
  validates :name, presence: true
  has_many :entities, class_name: 'AccessPermission::Entity'
  default_scope -> { order(:name) }
end
