# frozen_string_literal: true

class DepartmentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      ids = user.links.joins(person: :department_leaders).pluck('department_leaders.department_id')
      return scope.none if ids.empty?
      ids = ids.map { |id| scope.subtree_of(id).pluck(:id) }.flatten
      scope.where(id: ids)
    end
  end
end
