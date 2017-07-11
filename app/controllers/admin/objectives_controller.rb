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
    end

    def new
      build_objective
    end

    def create
      build_objective
      save_objective || render('new')
    end

    def edit
      load_objective
      build_objective
      page_meta[:name] = objective.name
    end

    def update
      load_objective
      build_objective
      save_objective || render('edit')
    end

    def destroy
      load_objective
      @objective.destroy
      redirect_to objectives_path
    end

    protected

    def load_objectives
      @objectives ||= objective_scope.all
    end

    def load_objective
      @objective ||= objective_scope.find_by!(id: params[:objective_id] || params[:id])
    end

    def build_objective
      @objective ||= objective_scope.build
      @objective.attributes = objective_params
    end

    def save_objective
      redirect_to @objective if @objective.save
    end

    def objective_scope
      policy_scope(@organization.objectives)
    end

    def objective_params
      return {} unless params[:objective]
      params.require(:objective).permit(:name)
    end

    def setup_breadcrumbs
      super
      return if params[:controller] == 'admin/objectives' && params[:action] == 'index' || params[:action] == 'new'
      return unless objective
      add_breadcrumb objective.name, objective_path(objective)
    end
  end
end
