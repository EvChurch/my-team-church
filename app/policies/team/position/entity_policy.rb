# frozen_string_literal: true

class Team::Position::EntityPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.where(id: (ids_by_team_ids + ids_by_department_ids + ids_by_person_ids).uniq)
    end

    def ids_by_team_ids
      scope.joins(position: :team).where(teams: { id: team_ids }).ids
    end

    def ids_by_department_ids
      scope.joins(position: { team: :departments }).where(departments: { id: department_and_children_ids }).ids
    end

    def ids_by_person_ids
      scope.where(person_id: person_ids).ids
    end

    def person_ids
      @person_ids ||= user.links.pluck(:person_id)
    end

    def organization_ids
      @organization_ids ||=
        scope.joins([{ position: :team }, :person])
             .pluck('teams.organization_id', 'people.organization_id')
             .flatten
             .uniq
    end
  end
end
