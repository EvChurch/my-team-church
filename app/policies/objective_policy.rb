# frozen_string_literal: true

class ObjectivePolicy < ApplicationPolicy
  def resources?
    create?
  end

  class Scope < Scope
    def resolve
      return scope.all if user.admin?
      scope.none
    end
  end
end
