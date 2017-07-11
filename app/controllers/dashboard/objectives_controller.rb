module Dashboard
  class ObjectivesController < DashboardController
    decorates_assigned :objective, :resources

    def new
      build_objective
      authorize :objective
      add_breadcrumb 'Objective', new_objective_path
    end

    def create
      build_objective
      authorize :objective
      return redirect_to @objective.resource if @objective.save
      render 'new'
    end

    def edit
      load_objective
      build_objective
      authorize :objective
      add_breadcrumb 'Edit', edit_objective_path
    end

    def update
      load_objective
      build_objective
      authorize :objective
      return redirect_to @objective.resource if @objective.save
      render 'edit'
    end

    def resources
      type = params[:type] ? params[:type] : 'Person'
      @resources = type.empty? ? [] : type.constantize.all
      authorize :objective
    end

    protected

    def load_objective
      @objective ||= objective_scope.find(params[:objective_id] || params[:id])
    end

    def build_objective
      @objective ||= objective_scope.new
      @objective.attributes = objective_params
    end

    def objective_params
      return {} unless params[:objective]
      params.require(:objective).permit(
        :resource_type, :resource_id,
        :name, :description,
        :estimated_completion,
        :kind,
        :amount_kind, :amount
      )
    end

    def objective_scope
      policy_scope(::Objective)
    end
  end
end
