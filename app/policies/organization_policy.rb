# frozen_string_literal: true

class OrganizationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(id: admin_organizations + linked_organizations)
    end

    protected

    def admin_organizations
      scope.with_role(:admin, user).pluck(:id)
    end

    def linked_organizations
      scope.joins(:user_links).where(user_links: { user: user }).pluck(:id)
    end
  end
end
