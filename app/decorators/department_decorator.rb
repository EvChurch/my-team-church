class DepartmentDecorator < ApplicationDecorator
  decorates_association :sub_departments
end
