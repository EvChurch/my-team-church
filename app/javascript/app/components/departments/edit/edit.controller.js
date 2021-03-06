class DepartmentsEditModalController {
  constructor(
    $scope, $state,
    departments, modal,
    department
  ) {
    this.$scope = $scope;
    this.$state = $state;
    this.departments = departments;
    this.modal = modal;
    this.id = department.id;
    this.department = {
      name: department.name,
      description: department.description,
      parent_id: department.parent_id
    };
  }
  save() {
    return this.departments.update(this.id, this.department).then((department) => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.modal.delete(this.department.name, 'department').then(() => {
      return this.departments.delete(this.id).then(() => {
        this.$scope.$hide();
      });
    });
  }
}

export default angular.module('app.components.departments.edit.controller', [])
  .controller('departmentsEditModalController', DepartmentsEditModalController).name;
