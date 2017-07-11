class DepartmentDecorator < ApplicationDecorator
  decorates_association :sub_departments
  decorates_association :objectives
end
