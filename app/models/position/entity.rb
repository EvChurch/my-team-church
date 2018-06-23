# frozen_string_literal: true

class Position::Entity < ApplicationRecord
  belongs_to :position, inverse_of: :entities
  belongs_to :person, inverse_of: :position_entities
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  has_many :entity_service_types, dependent: :destroy, inverse_of: :entity, class_name: 'Position::Entity::ServiceType'
  has_many :service_types, through: :entity_service_types, class_name: '::ServiceType'
  after_create :guess_service_type

  protected

  def guess_service_type
    return unless person.service_types.one? && service_types.empty?
    service_types << person.service_types.first
  end
end
