module Admin
  class AfterSignupController < AdminController
    layout 'admin/wizard'
    skip_before_action :load_organization, :validate_organization, except: [:finished]
    before_action :validate_current_path, except: [:index, :create, :update]

    def index
      redirect_to current_path
    end

    def finished
      after_signup_step.update(value: true)
    end

    protected

    def validate_current_path
      redirect_to current_path unless request.fullpath == current_path
    end

    def current_path
      unless current_user.configured?
        session[:redirect_after_configure] = new_after_signup_organization_url
        return edit_auth_user_url
      end
      return new_after_signup_organization_path unless Organization.with_role(:admin, current_user).exists?
      return finished_after_signup_index_path unless completed_signup_process?
      admin_root_path
    end

    def completed_signup_process?
      current_user.option_is_true? 'after_signup_step'
    end

    def after_signup_step
      current_user.options
                  .create_with(value: 0)
                  .first_or_create(key: 'after_signup_step')
    end
  end
end
