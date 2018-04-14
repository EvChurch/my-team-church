class DetailController {
  constructor(
    $rootScope, $state,
    departments, departmentPositions, objectives
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departments = departments;
    this.departmentPositions = departmentPositions;
    this.objectives = objectives;
  }
  $onInit() {
    this.$state.go('.positions');
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
