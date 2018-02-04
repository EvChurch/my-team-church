# frozen_string_literal: true

class AccessPermission < ApplicationRecord
  belongs_to :organization, inverse_of: :access_permissions
  has_many :entities,
           class_name: 'AccessPermission::Entity',
           dependent: :destroy,
           inverse_of: :access_permission
  validates :name, presence: true
  default_scope -> { order(:name) }
end
