# frozen_string_literal: true

class TeamPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.joins(:departments).where(departments: { id: department_and_children_ids })
    end
  end
end
