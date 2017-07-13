# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    true
  end

  def update?
    return true if record == user
  end
end
