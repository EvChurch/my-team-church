# frozen_string_literal: true

class People::PositionEntities::ObjectivesController < PositionEntitiesController
  before_action :load_position_entity
  decorates_assigned :objective

  def new
    build_objective
  end

  def create
    build_objective
    return redirect_to position_entity_path(@position_entity) if save_objective
    render 'new'
  end

  def edit
    load_objective
  end

  def update
    load_objective
    build_objective
    return redirect_to position_entity_path(@position_entity) if save_objective
    render 'edit'
  end

  protected

  def load_objective
    @objective ||= objective_scope.find(params[:objective_id] || params[:id])
  end

  def build_objective
    @objective ||= objective_scope.build
    @objective.attributes = objective_params
  end

  def objective_scope
    @position_entity.objectives
  end

  def save_objective
    @objective.save
  end

  def objective_params
    return {} unless params[:objective]
    params.require(:objective).permit(
      :name, :description,
      key_results_attributes: %i[id name result_type start_value target_value weight _destroy]
    )
  end
end
