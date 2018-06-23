# frozen_string_literal: true

class Department::Leader < ApplicationRecord
  belongs_to :person
  belongs_to :department
  validates :person_id, uniqueness: { scope: :department_id }
  has_many :leader_service_types,
           dependent: :destroy, 
           inverse_of: :leader,
           class_name: 'Department::Leader::ServiceType'
  has_many :service_types, through: :leader_service_types, class_name: '::ServiceType'
  after_create :guess_service_type

  protected

  def guess_service_type
    return unless person.service_types.one? && service_types.empty?
    service_types << person.service_types.first
  end
end
