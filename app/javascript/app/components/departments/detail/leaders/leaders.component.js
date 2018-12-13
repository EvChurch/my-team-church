class LeadersController {
  constructor(
    $rootScope, $stateParams,
    departmentsDetailLeaders
  ) {
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.departmentsDetailLeaders = departmentsDetailLeaders;

    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('leaderCreate', (_event, departmentId) => {
      if (departmentId === this.$stateParams.departmentId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('leaderDelete', (_event, departmentId) => {
      if (departmentId === this.$stateParams.departmentId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  load() {
    this.loading = true;
    this.departmentsDetailLeaders.load(this.$stateParams.departmentId).then((leaders) => {
      this.loading = false;
      this.list = angular.copy(leaders);
    });
  }
}

let Leaders = {
  template: require('./leaders.html'),
  controller: LeadersController
};

export default angular.module('app.components.departments.detail.leaders.component', [
]).component('departmentsDetailLeaders', Leaders).name;
