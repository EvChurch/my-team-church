# frozen_string_literal: true

class Position::EntityPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.where(id: (entity_ids_by_leader_ids + entity_ids_by_person_ids).uniq)
    end

    def entity_ids_by_leader_ids
      scope.joins(:position).where('positions.department_id', department_ids).ids
    end

    def entity_ids_by_person_ids
      scope.where(person_id: person_ids).ids
    end

    def person_ids
      @person_ids ||= user.links.pluck(:person_id)
    end

    def organization_ids
      @organization_ids ||=
        scope.joins(:position, :person).pluck('positions.organization_id', 'people.organization_id').flatten.uniq
    end
  end
end
