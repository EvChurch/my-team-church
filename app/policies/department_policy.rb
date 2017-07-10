class DepartmentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all.eager_load(
          sub_departments: [:positions]
        ).order('departments.name, sub_departments.name')
      else
        person.departments.eager_load(
          sub_departments: [:positions]
        ).where(
          'sub_departments_departments.id' => person.sub_department_ids,
          'positions_department_sub_departments.id' => person.position_ids
        ).distinct.order('departments.name, sub_departments_departments.name')
      end
    end
  end
end
