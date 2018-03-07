# frozen_string_literal: true

class Objective < ApplicationRecord
  belongs_to :resource, polymorphic: true
  has_many :child_links,
           class_name: 'Objective::Link',
           foreign_key: :parent_id,
           inverse_of: :parent,
           dependent: :destroy
  has_many :children, class_name: 'Objective', through: :child_links
  has_many :parent_links,
           class_name: 'Objective::Link',
           foreign_key: :child_id,
           inverse_of: :child,
           dependent: :destroy
  has_many :parents, class_name: 'Objective', through: :parent_links
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
