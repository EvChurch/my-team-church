class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  add_breadcrumb 'Home', :root_path
  include Pundit

  if Rails.env.development?
    after_action :verify_authorized, except: :index
    after_action :verify_policy_scoped, only: :index
    before_action :better_errors_hack, if: -> { Rails.env.development? }
  end

  def render(*args)
    setup_breadcrumbs
    super
  end

  protected

  def better_errors_hack
    request.env['puma.config'].options.user_options.delete :app
  end

  def current_person
    current_user.person
  end

  def setup_breadcrumbs; end
end
