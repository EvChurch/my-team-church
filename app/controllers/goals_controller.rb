class GoalsController < ApplicationController
  decorates_assigned :goal, :resources

  def new
    build_goal
    authorize :goal
    add_breadcrumb 'Goal', new_goal_path
  end

  def create
    build_goal
    authorize :goal
    return redirect_to @goal.resource if @goal.save
    render 'new'
  end

  def edit
    load_goal
    build_goal
    authorize :goal
    add_breadcrumb 'Edit', edit_goal_path
  end

  def update
    load_goal
    build_goal
    authorize :goal
    return redirect_to @goal.resource if @goal.save
    render 'edit'
  end

  def resources
    type = params[:type] ? params[:type] : 'Person'
    @resources = type.empty? ? [] : type.constantize.all
    authorize :goal
  end

  protected

  def load_goal
    @goal ||= goal_scope.find(params[:goal_id] || params[:id])
  end

  def build_goal
    @goal ||= goal_scope.new
    @goal.attributes = goal_params
  end

  def goal_params
    return {} unless params[:goal]
    params.require(:goal).permit(
      :resource_type, :resource_id,
      :name, :description,
      :estimated_completion,
      :kind,
      :amount_kind, :amount
    )
  end

  def goal_scope
    policy_scope(::Goal)
  end
end
