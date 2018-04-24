# frozen_string_literal: true

class Person < ApplicationRecord
  belongs_to :organization
  has_many :access_permission_entities,
           class_name: 'AccessPermission::Entity',
           dependent: :destroy,
           inverse_of: :person
  has_many :access_permissions,
           through: :access_permission_entities
  has_many :demographic_entities,
           class_name: 'Demographic::Entity',
           dependent: :destroy,
           inverse_of: :person
  has_many :demographics,
           through: :demographic_entities
  has_many :location_entities,
           class_name: 'Location::Entity',
           dependent: :destroy,
           inverse_of: :person
  has_many :locations,
           through: :location_entities
  has_many :position_entities,
           class_name: 'Position::Entity',
           dependent: :destroy,
           inverse_of: :person
  has_many :positions,
           through: :position_entities
  has_many :departments,
           through: :positions
  has_many :service_type_entities,
           class_name: 'ServiceType::Entity',
           dependent: :destroy,
           inverse_of: :person
  has_many :service_types,
           through: :service_type_entities
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  default_scope -> { order(:first_name, :last_name) }
  serialize :family, Hash
end
