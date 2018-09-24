# frozen_string_literal: true

class ServiceType < ApplicationRecord
  belongs_to :organization
  has_many :connections, class_name: 'ServiceType::Connection', dependent: :destroy, inverse_of: :service_type
  has_many :entities, class_name: 'ServiceType::Entity', dependent: :destroy, inverse_of: :service_type
  has_many :resources, through: :entities, source: :person
  validates :name, presence: true
  default_scope -> { order(:name) }
end
