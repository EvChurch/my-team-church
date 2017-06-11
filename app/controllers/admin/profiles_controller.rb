module Admin
  class ProfilesController < AdminController
    decorates_assigned :user, :users
    def edit
      load_user
      authorize @user
    end

    def update
      load_user
      authorize @user
      build_user
      unless save_user
        flash[:error] = @user.errors.full_messages
        return render :edit, status: :bad_request
      end
      return render nothing: true if request.xhr?
      flash[:success] = 'Personal Profile saved successfully'
      redirect_to action: :edit
    end

    protected

    def load_user
      @user ||= user_scope
    end

    def build_user
      @user.attributes = user_params
    end

    def save_user
      @user.save
    end

    def user_scope
      current_user
    end

    def user_params
      return {} unless params[:user]
      params.require(:user).permit(
        :first_name, :last_name, :email,
        :time_zone, :avatar, :cover_picture
      )
    end
  end
end
