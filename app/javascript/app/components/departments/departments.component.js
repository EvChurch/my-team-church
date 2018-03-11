class DepartmentsController {
  constructor(
    $rootScope,
    departments
  ) {
    this.$rootScope = $rootScope;
    this.departments = departments;
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('departmentCreate', () => this.departments.load(true));
    this.watcher1 = this.$rootScope.$on('departmentUpdate', () => this.departments.load(true));
    this.watcher2 = this.$rootScope.$on('departmentDelete', () => this.departments.load(true));
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
}

let Departments = {
  bindings: {},
  template: require('./departments.html'),
  controller: DepartmentsController
};

export default angular.module('app.components.departments.component', [
]).component('departments', Departments).name;
