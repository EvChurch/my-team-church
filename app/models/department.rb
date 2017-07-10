class Department < ApplicationRecord
  validates :name, presence: true
  has_many :sub_departments, class_name: 'Department::SubDepartment'
  has_many :goals, as: :resource
end
