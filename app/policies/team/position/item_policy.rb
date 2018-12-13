# frozen_string_literal: true

class Team::Position::ItemPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.joins(:position).where(positions: { department_id: department_and_children_ids })
    end

    def organization_ids
      @organization_ids ||=
        scope.joins(position: :team).pluck('teams.organization_id').uniq
    end
  end
end
