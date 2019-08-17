# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def elvanto
    auth = request.env['omniauth.auth']
    user = User::Oauth.from_omniauth(auth)

    return unless user.persisted?

    sign_in_and_redirect user, event: :authentication # this will throw if @user is not activated
    set_flash_message(:notice, :success, kind: 'Elvanto') if is_navigational_format?
  end

  def failure
    redirect_to root_path
  end
end
