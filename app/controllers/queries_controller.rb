# frozen_string_literal: true

class QueriesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_with_http_token

  def create
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      user: current_user,
      organization: organization_scope.find_by(id: variables[:organization_id])
    }
    result = MyPlaceSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  end

  private

  def organization_scope
    OrganizationPolicy::Scope.new(current_user, Organization)
                             .resolve
  end

  def authenticate_with_http_token
    return if current_user
    auth_header = request.headers['Authorization'].to_s
    token = auth_header.remove('Bearer ')
    return unless token
    user = User.find_by(token: token)
    sign_in user if user
  end

  def ensure_hash(ambiguous_param)
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
