# frozen_string_literal: true

class Location < ApplicationRecord
  belongs_to :organization, inverse_of: :locations
  has_many :entities, class_name: 'Location::Entity', dependent: :destroy, inverse_of: :location
  has_many :resources, through: :entities

  validates :name, presence: true
  default_scope -> { order(:name) }
end
