# frozen_string_literal: true

class LocationPolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        return scope.all if organizational_admin?
        scope.none
      end
  
      protected

      def organizational_admin?
        Organization.where(id: organization_ids).with_role(:admin, user).count == organization_ids.length
      end
  
      def organization_ids
        @organization_ids ||= scope.pluck(:organization_id).uniq
      end
    end

    def update?
      organizational_admin?
    end

    def destroy?
      organizational_admin?
    end

    protected

    def organizational_admin?
      resource.organization.with_role(:admin, user)
    end
  end
  