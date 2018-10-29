# frozen_string_literal: true

class Position::Entity < ApplicationRecord
  belongs_to :position, inverse_of: :entities
  belongs_to :person, inverse_of: :position_entities
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  has_many :service_type_connections,
           as: :resource,
           dependent: :destroy,
           inverse_of: :resource,
           class_name: 'ServiceType::Connection'
  has_many :service_types, through: :service_type_connections
  after_create :guess_service_type
  scope :active, lambda {
    where(start_at: nil, end_at: nil)
      .or(where('start_at <= :now AND end_at IS NULL', now: Time.current))
      .or(where('start_at IS NULL AND end_at >= :now', now: Time.current))
      .or(where('start_at <= :now AND end_at >= :now', now: Time.current))
  }

  protected

  def guess_service_type
    return unless person.service_types.one? && service_types.empty?
    service_types << person.service_types.first
  end
end
