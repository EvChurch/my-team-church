class DepartmentsNewModalController {
  constructor(
    $scope, $state, departments
  ) {
    this.$scope = $scope;
    this.$state = $state;
    this.departments = departments;
    this.department = { name: '' };
  }
  save() {
    return this.departments.create(this.deparment).then((deparment) => {
      if (deparment) {
        this.$state.go('departments.show', { departmentId: deparment.id });
        this.$scope.$hide();
      }
    });
  }
}

export default angular.module('app.components.departments.new.controller', [])
  .controller('departmentsNewModalController', DepartmentsNewModalController).name;
