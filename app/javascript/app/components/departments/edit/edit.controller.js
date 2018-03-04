class DepartmentsEditModalController {
  constructor(
    $scope, $state, departments, department
  ) {
    this.$scope = $scope;
    this.$state = $state;
    this.departments = departments;
    this.id = department.id;
    this.department = {
      name: department.name,
      description: department.description,
      parent_id: department.parent_id
    };
  }
  save() {
    return this.departments.update(this.id, this.department).then((department) => {
      this.$state.go('departments.detail', { id: department.id });
      this.$scope.$hide();
    });
  }
  delete() {
    return this.departments.delete(this.id).then(() => {
      this.$state.go('departments');
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.components.departments.edit.controller', [])
  .controller('departmentsEditModalController', DepartmentsEditModalController).name;
