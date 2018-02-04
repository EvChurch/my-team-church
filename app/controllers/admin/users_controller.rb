# frozen_string_literal: true

class Admin::UsersController < AdminController
  decorates_assigned :user, :users
  before_action :load_user, except: :index

  def index
    authorize @organization
    render json: UserDatatable.new(view_context, users: load_users) if request.xhr?
  end

  def show
    authorize @user
  end

  def promote
    authorize @organization
    if @user.has_role? :member, @organization
      flash[:error] = "#{user.name} is already a member"
    else
      @user.remove_role :pending, @organization
      @user.remove_role :revoked, @organization
      @user.add_role :member, @organization
      flash[:success] = "#{user.name} is now a member"
    end
    redirect_to user_path @user
  end

  def demote
    authorize @organization
    if @user.has_role? :member, @organization
      @user.remove_role :member, @organization
      @user.add_role :revoked, @organization
      flash[:success] = "#{user.name} is no longer a member"
    else
      flash[:error] = "#{user.name} is not a member"
    end
    redirect_to user_path @user
  end

  def add_admin
    authorize @organization
    if @user.has_role? :admin, @organization
      flash[:error] = "#{user.name} is already an admin"
    else
      @user.add_role :admin, @organization
      flash[:success] = "#{user.name} is now an admin"
    end
    redirect_to user_path @user
  end

  def remove_admin
    authorize @organization
    if @user.has_role? :admin, @organization
      @user.remove_role :admin, @organization
      flash[:success] = "#{user.name} is no longer an admin"
    else
      flash[:error] = "#{user.name} is not an admin"
    end
    redirect_to user_path @user
  end

  protected

  def load_users
    @users ||= user_scope
  end

  def load_user
    @user ||= user_scope.find_by!(id: params[:user_id] || params[:id])
  end

  def user_scope
    @organization.users params[:role].try(:to_sym)
  end
end
