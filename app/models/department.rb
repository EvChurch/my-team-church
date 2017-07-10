class Department < ApplicationRecord
  belongs_to :organization
  has_many :sub_departments, class_name: 'Department::SubDepartment', dependent: :destroy
  has_many :goals, as: :resource, dependent: :destroy

  validates :name, presence: true
end
