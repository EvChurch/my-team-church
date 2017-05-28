module Dashboard
  module Departments
    class SubDepartmentsController < DepartmentsController
      decorates_assigned :sub_department
      before_action :load_department

      def show
        load_sub_department
        page_meta[:name] = sub_department.name
        authorize @sub_department
      end

      protected

      def load_sub_department
        @sub_department ||= sub_department_scope.find(params[:sub_department_id] || params[:id])
      end

      def sub_department_scope
        policy_scope(::SubDepartment)
      end

      def setup_breadcrumbs
        super
        add_breadcrumb sub_department.name, department_sub_department_path(department, sub_department)
      end
    end
  end
end
