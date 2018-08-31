# frozen_string_literal: true

class Position::EntityPolicy < ApplicationPolicy
  class Scope < DepartmentPolicy::Scope
    protected

    def secure_scope
      scope.where(id: (entity_ids_by_leader_ids + entity_ids_by_person_ids).uniq)
    end

    def entity_ids_by_leader_ids
      service_type_ids_by_department_ids.map do |department_id, service_type_ids|
        scope.joins(:position)
             .joins(:service_types)
             .where('positions.department_id = ? AND service_types.id IN (?)', department_id, service_type_ids)
             .ids
      end.flatten
    end

    def entity_ids_by_person_ids
      scope.where(person_id: person_ids).ids
    end

    def service_type_ids_by_department_ids
      @service_type_ids =
        Hash[
          user.links
              .joins(person: { department_leaders: :service_types })
              .group('department_leaders.department_id')
              .pluck('department_leaders.department_id', 'array_agg(service_types.id)')
        ]
      @service_type_ids.clone.each do |department_id, service_type_ids|
        Department.subtree_of(department_id).pluck(:id).each do |sub_department_id|
          @service_type_ids[sub_department_id] = service_type_ids
        end
      end
      @service_type_ids
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
