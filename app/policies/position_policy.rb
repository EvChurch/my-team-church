class PositionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if person.admin?
        scope.all
      else
        person.positions.eager_load(:people)
      end
    end
  end
end
