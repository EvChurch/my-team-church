# frozen_string_literal: true

module Auth
  class ApplicationsController < AuthController
    respond_to :json
    before_action :default_format_json
    skip_before_action :authenticate_user!

    def show
      load_application
      render json: @application, serializer: Doorkeeper::ApplicationSerializer
    end

    protected

    def default_format_json
      request.format = 'json'
    end

    def load_application
      @application ||= application_scope
    end

    def application_scope
      Organization.from_url(request.referer).application
    end

    rescue_from ActiveRecord::RecordNotFound, with: (lambda do
      render status: 404, json: { errors: 'Invalid subdomain provided.' }
    end)
  end
end
