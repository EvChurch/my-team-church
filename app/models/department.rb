class Department < ApplicationRecord
  belongs_to :organization
  has_many :sub_departments, dependent: :destroy
  has_many :goals, as: :resource, dependent: :destroy

  validates :name, presence: true
end
