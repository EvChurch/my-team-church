class Department
  class SubDepartmentDecorator < ApplicationDecorator
    decorates_association :positions
  end
end
