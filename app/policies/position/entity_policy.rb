# frozen_string_literal: true

class Position::EntityPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.joins(:position)
           .where('positions.department_id IN (?) OR position_entities.person_id IN (?)',
                  department_ids,
                  person_ids)
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
