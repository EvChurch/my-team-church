module Admin
  class ObjectivesController < AdminController
    decorates_assigned :objectives, :objective
    add_breadcrumb 'Objectives', :objectives_path

    def index
      load_objectives
    end

    def show
      load_objective
      page_meta[:name] = objective.name
      authorize @objective
    end

    protected

    def load_objectives
      @objectives ||= objective_scope.all
    end

    def load_objective
      @objective ||= objective_scope.find_by!(id: params[:objective_id] || params[:id])
    end

    def objective_scope
      policy_scope(@organization.objectives)
    end

    def setup_breadcrumbs
      super
      return if params[:controller] == 'admin/objectives' && params[:action] == 'index'
      return unless objective
      add_breadcrumb objective.name, objective_path(objective)
    end
  end
end
