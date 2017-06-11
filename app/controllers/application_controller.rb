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

  def after_sign_in_path_for(resource)
    redirect_uri = root_url(subdomain: super)
    return edit_auth_user_url unless resource_configured?(resource, redirect_uri)
    return auth_organization_url unless resource_is_member?(resource, redirect_uri)
    redirect_uri
  end

  def resource_configured?(resource, redirect_uri)
    return true if resource.configured?
    configure_session(redirect_uri)
  end

  def resource_is_member?(resource, redirect_uri)
    return true if redirect_uri
    @organization = Organization.from_url(redirect_uri)
    return true if resource.has_role? :member, @organization
    configure_session(redirect_uri)
  end

  def configure_session(redirect_uri)
    session[:redirect_after_configure] = if redirect_uri =~ %r{https*\:\/\/}
                                           redirect_uri
                                         else
                                           "#{request.base_url}#{redirect_uri}"
                                         end
    false
  end
end
