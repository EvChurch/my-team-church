class Person < ApplicationRecord
  belongs_to :organization
  has_many :access_permission_entities,
           class_name: 'AccessPermission::Entity',
           as: :resource,
           dependent: :destroy
  has_many :access_permissions,
           through: :access_permission_entities
  has_many :demographic_entities,
           class_name: 'Demographic::Entity',
           as: :resource,
           dependent: :destroy
  has_many :demographics,
           through: :demographic_entities
  has_many :location_entities,
           class_name: 'Location::Entity',
           as: :resource,
           dependent: :destroy
  has_many :locations,
           through: :location_entities,
           as: :resource
  has_many :position_entities,
           class_name: 'Position::Entity',
           as: :resource,
           dependent: :destroy
  has_many :positions,
           through: :position_entities
  has_many :sub_departments,
           through: :positions
  has_many :departments,
           through: :sub_departments
  has_many :service_type_entities,
           class_name: 'ServiceType::Entity',
           as: :resource,
           dependent: :destroy
  has_many :service_types,
           through: :service_type_entities
  default_scope -> { order(:firstname, :lastname) }
  serialize :family, Hash
end
