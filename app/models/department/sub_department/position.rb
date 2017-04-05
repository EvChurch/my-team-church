class Department
  class SubDepartment
    class Position < ApplicationRecord
      include ElvantoCollection
      validates :name, presence: true
      validates :sub_department, presence: true
      has_many :entities, class_name: 'Department::SubDepartment::Position::Entity'
      has_many :resources, through: :entities
      belongs_to :sub_department
    end
  end
end
