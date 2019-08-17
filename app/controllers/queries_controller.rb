# frozen_string_literal: true

class QueriesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_with_http_token!

  def create
    render json: result
  end

  protected

  def authenticate_with_http_token!
    return if current_user

    auth_header = request.headers['Authorization'].to_s
    token = auth_header.remove('Bearer ')
    return unless token

    user = User.find_by(token: token)
    return sign_in(user) if user

    head :unauthorized unless %w[createUser authenticateUser].include?(operation_name)
  end

  def result
    MyTeamSchema.execute(
      params[:query],
      variables: variables,
      context: context,
      operation_name: operation_name,
      root_value: organization
    )
  end

  def context
    { current_user: current_user }
  end

  def organization
    OrganizationPolicy::Scope.new(current_user, Organization)
                             .resolve
                             .find_by(id: variables[:organization_id])
  end

  def operation_name
    params[:operationName]
  end

  def variables(ambiguous_param = params[:variables])
    case ambiguous_param
    when String
      ambiguous_param.present? ? ensure_hash(JSON.parse(ambiguous_param)) : {}
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
