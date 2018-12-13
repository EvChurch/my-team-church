# frozen_string_literal: true

class Team::PositionPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.where(department_id: department_and_children_ids)
    end

    def organization_ids
      @organization_ids ||= scope.joins(:team).pluck('teams.organization_id').uniq
    end
  end
end