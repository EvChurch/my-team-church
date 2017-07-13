module Admin
  class PositionsController < SubDepartmentsController
    decorates_assigned :position

    def show
      load_position
      page_meta[:name] = position.name
      authorize @position
    end

    protected

    def load_position
      @position ||= position_scope.find_by!(id: params[:position_id] || params[:id])
    end

    def position_scope
      policy_scope(::Position)
    end

    def setup_breadcrumbs
      super
      add_breadcrumb position.name, position_path(position)
    end
  end
end
