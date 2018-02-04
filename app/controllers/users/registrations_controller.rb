# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  def sign_up_params
    super.merge(subdomain: request.subdomain)
  end
end
