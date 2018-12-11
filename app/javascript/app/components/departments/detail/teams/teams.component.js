class TeamsController {
  constructor(
    $rootScope,
    departmentDetailTeams
  ) {
    this.$rootScope = $rootScope;
    this.departmentDetailTeams = departmentDetailTeams;
    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('teamCreate', (_event, departmentId) => {
      if (departmentId === this.departmentId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('teamUpdate', (_event, departmentId) => {
      if (departmentId === this.departmentId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('teamDelete', (_event, departmentId) => {
      if (departmentId === this.departmentId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departmentDetailTeams.load(this.departmentId).then((teams) => {
      this.loading = false;
      this.list = angular.copy(teams);
    });
  }
}

let Teams = {
  bindings: {
    departmentId: '<'
  },
  template: require('./teams.html'),
  controller: TeamsController
};

export default angular.module('app.components.departments.detail.teams.component', [
]).component('departmentsDetailTeams', Teams).name;
