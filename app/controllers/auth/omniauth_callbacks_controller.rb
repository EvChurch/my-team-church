module Auth
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def cas
      @user = User::Oauth.from_omniauth(request.env['omniauth.auth'])
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: 'CAS') if is_navigational_format?
    end
  end
end
