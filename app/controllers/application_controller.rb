# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit
  include ApplicationHelper
  protect_from_forgery with: :exception, except: :preflight, prepend: true
  before_action :better_errors_hack, if: -> { Rails.env.development? }

  def preflight
    render nothing: true
  end

  protected

  def better_errors_hack
    request.env['puma.config'].options.user_options.delete :app
  end
end
