# frozen_string_literal: true

class AdminController < ApplicationController
  include Pundit
  layout 'admin'
  before_action :authenticate_user!
  before_action :load_organization
  before_action :load_organizations
  before_action :validate_organization
  decorates_assigned :organization, :organizations

  def index; end

  def export; end

  protected

  def load_organizations
    @organizations ||= organization_scope
  end

  def load_organization
    @organization ||= organization_scope.find_by(id: session[:organization_id]) if session.key?(:organization_id)
    @organization ||= organization_scope.try(:first)
    session[:organization_id] = @organization.try(:id)
    authorize @organization, :update? unless @organization.nil?
  end

  def validate_organization
    redirect_to after_signup_index_path unless @organization
  end

  def organization_scope
    policy_scope(::Organization)
  end

  rescue_from ActiveRecord::RecordNotFound, with: (lambda do
    render 'not_found', status: 404
  end)
end
