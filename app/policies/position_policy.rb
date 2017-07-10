class PositionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        person.positions.eager_load(:people)
      end
    end
  end
end
