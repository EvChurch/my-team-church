class DepartmentsController < ApplicationController
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

  def render
    setup_breadcrumbs
    super
  end

  protected

  def load_departments
    @departments ||= department_scope.all
  end

  def load_department
    @department ||= department_scope.find(params[:department_id] || params[:id])
  end

  def department_scope
    policy_scope(::Department)
  end

  def setup_breadcrumbs
    return if params[:controller] == 'departments' && params[:action] == 'index'
    add_breadcrumb department.name, department_path(department)
  end
end
