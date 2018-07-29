# frozen_string_literal: true

class Department::Leader < ApplicationRecord
  belongs_to :person
  belongs_to :department
  validates :person_id, uniqueness: { scope: :department_id }
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  has_many :service_type_connections,
           as: :resource,
           dependent: :destroy,
           inverse_of: :resource,
           class_name: 'ServiceType::Connection'
  has_many :service_types, through: :service_type_connections
  after_create :guess_service_type

  protected

  def guess_service_type
    return unless person.service_types.one? && service_types.empty?
    service_types << person.service_types.first
  end
end
