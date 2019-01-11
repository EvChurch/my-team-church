# frozen_string_literal: true

class OrganizationDecorator < ApplicationDecorator
  decorates_association :teams
  decorates_association :department_imports

  def admin
    context[:user].has_role?(:admin, object)
  end

  def department_leader
    object.department_leaders.kept.where(
      person_id: context[:user].links.where(organization_id: object.id).pluck(:person_id)
    ).exists?
  end

  def team_leader
    object.team_leaders.kept.where(
      person_id: context[:user].links.where(organization_id: object.id).pluck(:person_id)
    ).exists?
  end

  def address
    [address_1, address_2, city, state, zip].reject(&:blank?).join(', ')
  end
end
