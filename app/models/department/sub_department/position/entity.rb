class Department
  class SubDepartment
    class Position
      class Entity < ApplicationRecord
        belongs_to :position
        belongs_to :resource, polymorphic: true
      end
    end
  end
end
