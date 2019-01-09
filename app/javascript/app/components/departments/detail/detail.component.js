class DetailController {
  constructor(
    $rootScope, $state, $stateParams, $transitions,
    departments
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$transitions = $transitions;
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
    this.watcher0 = this.$rootScope.$on('departmentUpdate', (_event, department) => {
      if (department.id === this.department.id) this.department = department;
    });
    this.watcher1 = this.$rootScope.$on('departmentDelete', (_event, department) => {
      if (department.id === this.department.id) this.$state.go('departments');
    });
    this.$state.go('.teams');
    this.$transitions.onSuccess({}, (transition) => {
      if (transition.to().name == 'departments.detail') {
        this.$state.go('.teams');
      }
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  visibleOnMobile() {
    return this.$state.is('departments.detail.teams') ||
      this.$state.is('departments.detail.leaders') ||
      this.$state.is('departments.detail.objectives')
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.component', [
]).component('departmentsDetail', Detail).name;
