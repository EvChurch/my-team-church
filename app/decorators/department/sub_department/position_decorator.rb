class Department
  class SubDepartment
    class PositionDecorator < ApplicationDecorator
      decorates_association :people
    end
  end
end
