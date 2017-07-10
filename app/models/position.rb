class Position < ApplicationRecord
  validates :name, presence: true
  validates :sub_department, presence: true
  has_many :entities, class_name: 'Position::Entity'
  has_many :resources, through: :entities
  has_many :people, through: :entities, source_type: 'Person', source: :resource
  belongs_to :sub_department
  has_many :goals, as: :resource
end
