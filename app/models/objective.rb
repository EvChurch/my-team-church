# frozen_string_literal: true

class Objective < ApplicationRecord
  belongs_to :resource, polymorphic: true
  has_many :key_results, dependent: :destroy, inverse_of: :objective
  validates :name, :resource_type, :resource_id, presence: true
  accepts_nested_attributes_for :key_results, reject_if: :all_blank, allow_destroy: true
  default_scope { order('LOWER(name)') }

  RESOURCE_TYPES = {
    'Person' => 'Person',
    'Department' => 'Department',
    'Sub Department' => 'SubDepartment',
    'Position' => 'Position'
  }.freeze
end
