# frozen_string_literal: true

class DepartmentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      return scope.all if organizational_admin?
      secure_scope
    end

    protected

    def secure_scope
      scope.where(id: department_ids)
    end

    def department_ids
      return @department_ids if @department_ids
      @department_ids = user.links.joins(person: :department_leaders).pluck('department_leaders.department_id')
    end

    def department_and_children_ids
      return @department_and_children_ids if @department_and_children_ids
      @department_and_children_ids = department_ids.map { |id| Department.subtree_of(id).pluck(:id) }.flatten
    end

    def organizational_admin?
      Organization.where(id: organization_ids).with_role(:admin, user).count == organization_ids.length
    end

    def organization_ids
      @organization_ids ||= scope.pluck(:organization_id).uniq
    end
  end
end
