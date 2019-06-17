# frozen_string_literal: true

class Department::Leader < ApplicationRecord
  belongs_to :person
  belongs_to :department
  validates :person_id, uniqueness: { scope: :department_id }
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  delegate :organization, to: :department
  scope :kept, -> { undiscarded.joins(:department).merge(Department.kept) }
end
