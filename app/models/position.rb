# frozen_string_literal: true

class Position < ApplicationRecord
  belongs_to :organization
  belongs_to :department
  has_many :entities, class_name: 'Position::Entity', dependent: :destroy
  has_many :resources, through: :entities
  has_many :people, through: :entities, source_type: 'Person', source: :resource
  has_many :objectives, as: :resource, dependent: :destroy
  validates :name, presence: true
  default_scope -> { order(:name) }
end
