class LeadersController {
  constructor(
    $rootScope, $stateParams,
    departmentsDetailTeamsDetailLeaders
  ) {
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailLeaders = departmentsDetailTeamsDetailLeaders;

    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('leaderCreate', (_event, teamId) => {
      if (teamId === this.$stateParams.teamId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('leaderDelete', (_event, teamId) => {
      if (teamId === this.$stateParams.teamId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  load() {
    this.loading = true;
    this.departmentsDetailTeamsDetailLeaders.load(this.$stateParams.teamId).then((leaders) => {
      this.loading = false;
      this.list = angular.copy(leaders);
    });
  }
}

let Leaders = {
  template: require('./leaders.html'),
  controller: LeadersController
};

export default angular.module('app.components.departments.detail.teams.detail.leaders.component', [
]).component('departmentsDetailTeamsDetailLeaders', Leaders).name;
