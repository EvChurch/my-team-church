class Department
  class SubDepartment < ApplicationRecord
    include ElvantoCollection
    validates :name, presence: true
    validates :department, presence: true
    has_many :positions, class_name: 'Department::SubDepartment::Position'
    belongs_to :department
  end
end
