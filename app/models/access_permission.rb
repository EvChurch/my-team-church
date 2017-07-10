class AccessPermission < ApplicationRecord
  belongs_to :organization
  has_many :entities, class_name: 'AccessPermission::Entity', dependent: :destroy
  validates :name, presence: true
  default_scope -> { order(:name) }
end
