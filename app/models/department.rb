# frozen_string_literal: true

class Department < ApplicationRecord
  has_ancestry
  belongs_to :organization
  has_many :positions, dependent: :destroy
  has_many :people, -> { uniq }, through: :positions
  has_many :objectives, as: :resource, dependent: :destroy
  validates :name, presence: true
  default_scope { order('LOWER(name)') }
end
