class DetailController {
  constructor(
    $rootScope, $state
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
  }
  $onInit() {
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
