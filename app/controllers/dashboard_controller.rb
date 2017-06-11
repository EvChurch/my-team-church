class DashboardController < ApplicationController
  include Pundit

  layout 'dashboard'
  before_action :authenticate_user!
  before_action :load_organization
  before_action :verify_authorized, except: :index, if: -> { Rails.env.development? }
  before_action :verify_policy_scoped, only: :index, if: -> { Rails.env.development? }
  decorates_assigned :organization

  def index
  end

  protected

  def load_organization
    @organization ||= organization_scope.find_by(subdomain: request.subdomain)
  end

  def organization_scope
    policy_scope(::Organization)
  end
end
