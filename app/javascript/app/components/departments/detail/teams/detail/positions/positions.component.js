class PositionsController {
  constructor(
    $rootScope, $stateParams,
    departmentsDetailTeamsDetailPositions
  ) {
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositions = departmentsDetailTeamsDetailPositions;
    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('positionCreate', (_event, teamId) => {
      if (teamId === this.$stateParams.teamId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('positionUpdate', (_event, teamId) => {
      if (teamId === this.$stateParams.teamId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('positionDelete', (_event, teamId) => {
      if (teamId === this.$stateParams.teamId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departmentsDetailTeamsDetailPositions.load(this.$stateParams.teamId).then((positions) => {
      this.loading = false;
      this.list = angular.copy(positions);
    });
  }
}

let Positions = {
  template: require('./positions.html'),
  controller: PositionsController
};

export default angular.module('app.components.departments.detail.teams.detail.positions.component', [
]).component('departmentsDetailTeamsDetailPositions', Positions).name;
