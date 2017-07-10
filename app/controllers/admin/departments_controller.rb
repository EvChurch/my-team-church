module Admin
  class DepartmentsController < AdminController
    decorates_assigned :departments, :department
    add_breadcrumb 'Departments', :departments_path

    def index
      load_departments
    end

    def show
      load_department
      page_meta[:name] = department.name
      authorize @department
    end

    protected

    def load_departments
      @departments ||= department_scope.all
    end

    def load_department
      @department ||= department_scope.find_by!(id: params[:department_id] || params[:id])
    end

    def department_scope
      policy_scope(@organization.departments)
    end

    def setup_breadcrumbs
      super
      return if params[:controller] == 'admin/departments' && params[:action] == 'index'
      return unless department
      add_breadcrumb department.name, department_path(department)
    end
  end
end
