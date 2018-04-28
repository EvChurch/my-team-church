# frozen_string_literal: true

class OrganizationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.joins(:user_links).where(user_links: { user: user })
      # scope.with_role(:admin, user).or()
    end
  end
end
