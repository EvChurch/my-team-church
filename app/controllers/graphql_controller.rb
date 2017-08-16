# frozen_string_literal: true

class GraphqlController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_with_http_token

  def execute
    load_organization
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      user: current_user,
      organization: @organization
    }
    result = MyPlaceSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  end

  private

  def authenticate_with_http_token
    return if current_user
    auth_header = request.headers['Authorization'].to_s
    token = auth_header.remove('Token ')
    return unless token
    user = User.find_by(token: token)
    sign_in user if user
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

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
