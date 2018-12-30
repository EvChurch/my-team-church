# frozen_string_literal: true

class Team::Position::ItemPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.where(id: (ids_by_department_ids + ids_by_person_ids).uniq)
    end

    def ids_by_department_ids
      scope.joins(position: { team: :departments }).where(departments: { id: department_and_children_ids }).ids
    end

    def ids_by_person_ids
      scope.joins(position: :entities).where(team_position_entities: { person_id: person_ids }).ids
    end

    def person_ids
      @person_ids ||= user.links.pluck(:person_id)
    end

    def organization_ids
      @organization_ids ||=
        scope.joins(position: :team).pluck('teams.organization_id').uniq
    end
  end
end
