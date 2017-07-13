# frozen_string_literal: true

module Auth
  class OrganizationsController < AuthController
    decorates_assigned :organization

    def show
      load_organization
      return render 'revoked', status: :unauthorized if current_user.has_role? :revoked, @organization
      return redirect if current_user.has_role? :member, @organization
      current_user.add_role :pending, @organization unless current_user.has_role? :pending, @organization
    end

    protected

    def redirect
      redirect_to session[:redirect_after_configure]
      session[:redirect_after_configure] = nil
    end

    def load_organization
      @organization ||= organization_scope
    end

    def organization_scope
      Organization.from_url(CGI.parse(session[:redirect_after_configure])['redirect_uri'][0])
    rescue
      raise ActiveRecord::RecordNotFound
    end

    rescue_from ActiveRecord::RecordNotFound, with: (lambda do
      render 'not_found', status: 404
    end)
  end
end
