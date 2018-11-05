# frozen_string_literal: true

class OrganizationDecorator < ApplicationDecorator
  decorates_association :teams
  decorates_association :department_imports

  def admin
    context[:user].has_role?(:admin, object)
  end

  def leader
    object.department_leaders.where(
      person_id: context[:user].links.where(organization_id: object.id).pluck(:person_id)
    ).exists?
  end
end
