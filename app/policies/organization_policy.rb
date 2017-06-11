class OrganizationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.with_role(:admin, user)
    end
  end
end
