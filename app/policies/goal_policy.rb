class GoalPolicy < ApplicationPolicy
  def resources?
    create?
  end

  class Scope < Scope
    def resolve
      return scope.all if person.admin?
      scope.none
    end
  end
end
