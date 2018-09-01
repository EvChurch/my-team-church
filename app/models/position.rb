# frozen_string_literal: true

class Position < ApplicationRecord
  belongs_to :organization
  belongs_to :department
  has_many :entities, class_name: 'Position::Entity', dependent: :destroy, inverse_of: :position
  has_many :people, through: :entities
  has_many :objectives, as: :resource, dependent: :destroy, inverse_of: :resource
  has_many :items, class_name: 'Position::Item', dependent: :destroy, inverse_of: :position
  validates :name, presence: true
  default_scope -> { order(:name) }
end
