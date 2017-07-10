class SubDepartment < ApplicationRecord
  belongs_to :organization
  belongs_to :department
  has_many :positions, dependent: :destroy
  has_many :goals, as: :resource, dependent: :destroy
  validates :name, presence: true
  validates :department, presence: true
end
