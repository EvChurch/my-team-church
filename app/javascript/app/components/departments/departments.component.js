class DepartmentsController {
  constructor(
    $rootScope,
    $state,
    $stateParams,
    departments
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
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
  visibleOnMobile() {
    return this.$state.is('departments');
  }
}

let Departments = {
  template: require('./departments.html'),
  controller: DepartmentsController
};

export default angular.module('app.components.departments.component', [
]).component('departments', Departments).name;
