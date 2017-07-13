# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    def sign_up_params
      super.merge(subdomain: request.subdomain)
    end
  end
end
