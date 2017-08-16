# frozen_string_literal: true

class PositionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all if user.admin?
    end
  end
end
