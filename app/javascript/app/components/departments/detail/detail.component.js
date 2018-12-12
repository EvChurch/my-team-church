class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departments
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departments = departments;
  }
  $onInit() {
    this.loading = true;
    this.departments.get(this.$stateParams.departmentId).then((department) => {
      this.department = department;
      this.loading = false;
    }).catch((ex) => {
      this.$state.go('departments');
      throw ex;
    });
    this.$state.go('.teams');
    this.watcher0 = this.$rootScope.$on('departmentUpdate', (_event, department) => {
      if (department.id === this.department.id) this.department = department;
    });
    this.watcher1 = this.$rootScope.$on('departmentDelete', (_event, department) => {
      if (department.id === this.department.id) this.$state.go('^');
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.component', [
]).component('departmentsDetail', Detail).name;
