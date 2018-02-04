# frozen_string_literal: true

class Demographic < ApplicationRecord
  belongs_to :organization, inverse_of: :demographics
  has_many :entities,
           class_name: 'Demographic::Entity',
           dependent: :destroy,
           inverse_of: :demographic
  has_many :resources, through: :entities
  validates :name, presence: true
  default_scope -> { order(:name) }
end
