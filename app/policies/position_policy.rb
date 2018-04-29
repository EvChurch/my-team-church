# frozen_string_literal: true

class PositionPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.where(department_id: department_ids)
    end
  end
end
