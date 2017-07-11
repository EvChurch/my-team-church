module Admin
  module Departments
    module SubDepartments
      class PositionsController < SubDepartmentsController
        decorates_assigned :position
        before_action :load_sub_department

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
          add_breadcrumb position.name, department_sub_department_position_path(department, sub_department, position)
        end
      end
    end
  end
end