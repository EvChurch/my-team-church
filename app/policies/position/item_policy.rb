# frozen_string_literal: true

class Position::ItemPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.joins(:position).where(positions: { department_id: department_ids })
    end
  end
end
