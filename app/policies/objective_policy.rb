# frozen_string_literal: true

class ObjectivePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      return scope.all if user.admin?

      scope.none
    end
  end

  def resources?
    create?
  end
end
