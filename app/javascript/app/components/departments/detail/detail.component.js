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
    this.departments.get(this.$stateParams.departmentId).then((department) => {
      this.department = department;
    });

    this.watcher0 = this.$rootScope.$on('departmentDelete', (_event, department) => {
      if (department.id === this.department.id) this.$state.go('^');
    });
  }
  $onDestroy() {
    this.watcher0();
  }
}

let Detail = {
  bindings: {
    department: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.component', [
]).component('departmentsDetail', Detail).name;
