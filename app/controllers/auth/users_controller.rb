module Auth
  class UsersController < AuthController
    decorates_assigned :user

    def edit
      load_user
      authorize @user
      build_user
    end

    def update
      load_user
      authorize @user
      build_user
      unless save_user
        flash[:error] = @user.errors.full_messages
        return render :edit, status: :bad_request
      end
      flash[:success] = 'Personal Profile saved successfully'
      redirect
    end

    protected

    def redirect
      return redirect_to action: :edit unless session[:redirect_after_configure]
      if url_to_subdomain(session[:redirect_after_configure]) == 'admin'
        redirect_to session[:redirect_after_configure]
        return session[:redirect_after_configure] = nil
      end
      redirect_to auth_organization_url
    end

    def load_user
      @user ||= user_scope
    end

    def build_user
      @user.attributes = user_params
      @user.configured = true if params[:action] == 'update'
    end

    def save_user
      @user.save
    end

    def user_scope
      current_user
    end

    def user_params
      return {} unless params[:user]
      params.require(:user).permit(:first_name, :last_name, :email,
                                   :time_zone, :avatar, :cover_picture)
    end
  end
end
