module Users
  class SessionsController < Devise::SessionsController
    def new
      self.resource = resource_class.new(sign_in_params)
      store_location_for(resource, params[:subdomain_redirect])
      super
    end
  end
end
