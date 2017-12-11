# frozen_string_literal: true

class PeopleController < ApplicationController
  before_action :authenticate_user!
  before_action :load_organization
  decorates_assigned :person

  def show
    load_person
  end

  protected

  def load_person
    @person ||= person_scope.find_by(email: current_user.email)
  end

  def person_scope
    @organization.people
  end

  def load_organization
    @organization ||= Organization.find_by!(subdomain: request.subdomain)
  end
end
