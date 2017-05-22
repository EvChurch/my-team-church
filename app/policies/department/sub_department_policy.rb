class Department
  class SubDepartmentPolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        if person.admin?
          scope.eager_load(:positions)
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
end
