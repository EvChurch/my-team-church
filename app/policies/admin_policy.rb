class AdminPolicy < ApplicationPolicy
  def create?
    user.has_role?(:admin, organization)
  end

  def destroy?
    user.has_role?(:admin, organization)
  end
end
