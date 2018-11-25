class DepartmentsController {
  constructor(
    $rootScope,
    $state,
    departments
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departments = departments;
    this.list = [];
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('departmentCreate', () => this.load());
    this.watcher1 = this.$rootScope.$on('departmentUpdate', () => this.load());
    this.watcher2 = this.$rootScope.$on('departmentDelete', () => this.load());
    this.load();
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departments.load().then((departments) => {
      this.loading = false;
      this.list = angular.copy(departments);
    })
  }
}

let Departments = {
  bindings: {},
  template: require('./departments.html'),
  controller: DepartmentsController
};

export default angular.module('app.components.departments.component', [
]).component('departments', Departments).name;
