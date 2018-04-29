class LeadersController {
  constructor(
    $rootScope,
    departmentLeaders
  ) {
    this.$rootScope = $rootScope;
    this.departmentLeaders = departmentLeaders;
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('departmentLeaderCreate', (_event, departmentId) => {
      if (departmentId === this.departmentId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('departmentLeaderDelete', (_event, departmentId) => {
      if (departmentId === this.departmentId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  load() {
    this.departmentLeaders.load(this.departmentId).then((data) => {
      this.list = angular.copy(data);
    });
  }
}

let Leaders = {
  bindings: {
    departmentId: '<'
  },
  template: require('./leaders.html'),
  controller: LeadersController
};

export default angular.module('app.components.departments.detail.leaders.component', [
]).component('departmentsDetailLeaders', Leaders).name;
