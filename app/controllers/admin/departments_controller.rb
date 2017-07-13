module Admin
  class DepartmentsController < AdminController
    decorates_assigned :departments, :department, :sub_departments
    add_breadcrumb 'Departments', :departments_path

    def index
      load_departments
    end

    def show
      load_department
      load_sub_departments
      page_meta[:name] = department.name
      authorize @department
      render 'index'
    end

    def create
      build_department
      if save_department
        if request.xhr?
          head :created
        end
      else
        if request.xhr?
          head :unprocessable_entity
        end
      end
    end

    def destroy
      load_department
      @department.destroy
      head :ok
    end

    protected

    def load_departments
      @departments ||= department_scope.roots
    end

    def load_department
      @department ||= department_scope.find_by!(id: params[:department_id] || params[:id])
    end

    def load_sub_departments
      @departments ||= @department.children
    end

    def build_department
      @department ||= department_scope.build
      @department.attributes = department_params
    end

    def save_department
      @department.save
    end

    def department_scope
      policy_scope(@organization.departments)
    end

    def department_params
      return {} unless params[:department]
      params.require(:department).permit(:parent_id, :name)
    end

    def setup_breadcrumbs
      super
      return if params[:controller] == 'admin/departments' && params[:action] == 'index'
      return unless department
      add_breadcrumb department.name, department_path(department)
    end
  end
end
