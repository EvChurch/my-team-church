class DepartmentsNewModalController {
  constructor(
    $scope, $state, departments, parentId
  ) {
    this.$scope = $scope;
    this.$state = $state;
    this.departments = departments;
    this.department = { name: '', description: '', parent_id: parentId };
  }
  save() {
    return this.departments.create(this.department).then((department) => {
      this.$state.go('departments.detail', { departmentId: department.id });
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.components.departments.new.controller', [])
  .controller('departmentsNewModalController', DepartmentsNewModalController).name;
