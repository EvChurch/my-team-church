class ApplicationController < ActionController::Base
  include Pundit
  include ApplicationHelper
  protect_from_forgery with: :exception, except: :preflight, prepend: true
  around_action :user_time_zone
  before_action :better_errors_hack, if: -> { Rails.env.development? }

  def render(*args)
    setup_breadcrumbs
    super
  end
  
  def preflight
    render nothing: true
  end

  def peek_enabled?
    user_signed_in? && current_user.admin?
  end

  protected

  def better_errors_hack
    request.env['puma.config'].options.user_options.delete :app
  end

  def current_person
    current_user.person
  end

  def setup_breadcrumbs; end

  def user_time_zone(&block)
    time_zone = current_user.try(:time_zone) || 'UTC'
    Time.use_zone(time_zone, &block)
  end
end
