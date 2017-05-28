class SubDepartmentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if person.admin?
        scope.eager_load(
        :positions
        ).order('department_sub_departments.name, department_sub_department_positions.name')
      else
        person.sub_departments.eager_load(
          :positions
        ).where(
          'positions_department_sub_departments.id' => person.position_ids
        ).distinct.order('department_sub_departments.name, positions_department_sub_departments.name')

      end
    end
  end
end
