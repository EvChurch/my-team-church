class TeamsController {
  constructor(
    $rootScope, $stateParams,
    departmentsDetailTeams
  ) {
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeams = departmentsDetailTeams;
    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('teamCreate', (_event, departmentId) => {
      if (departmentId === this.$stateParams.departmentId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('teamUpdate', (_event, departmentId) => {
      if (departmentId === this.$stateParams.departmentId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('teamDelete', (_event, departmentId) => {
      if (departmentId === this.$stateParams.departmentId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departmentsDetailTeams.load(this.$stateParams.departmentId).then((teams) => {
      this.loading = false;
      this.list = angular.copy(teams);
    });
  }
}

let Teams = {
  template: require('./teams.html'),
  controller: TeamsController
};

export default angular.module('app.components.departments.detail.teams.component', [
]).component('departmentsDetailTeams', Teams).name;
