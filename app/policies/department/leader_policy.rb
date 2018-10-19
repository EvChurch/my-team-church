# frozen_string_literal: true

class Department::LeaderPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.where(department_id: department_and_children_ids)
    end

    def organization_ids
      @organization_ids ||=
        scope.joins(:department, :person).pluck('departments.organization_id', 'people.organization_id').flatten.uniq
    end
  end
end
