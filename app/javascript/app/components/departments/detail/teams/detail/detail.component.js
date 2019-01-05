  class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentsDetailTeams
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeams = departmentsDetailTeams;
  }
  $onInit() {
    this.loading = true;
    this.departmentsDetailTeams.get(this.$stateParams.teamId).then((team) => {
      this.team = team;
      this.loading = false;
    }).catch((ex) => {
      this.$state.go('departments.detail.teams');
      throw ex;
    });
    this.$state.go('.positions');
    this.watcher0 = this.$rootScope.$on('teamUpdate', (_event, _departmentId, team) => {
      if (team.id === this.team.id) this.team = team;
    });
    this.watcher1 = this.$rootScope.$on('teamDelete', (_event, _departmentId, team) => {
      if (team.id === this.team.id) this.$state.go('departments.detail.teams');
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  visibleOnMobile() {
    return this.$state.is('departments.detail.teams.detail.objectives') ||
      this.$state.is('departments.detail.teams.detail.positions') ||
      this.$state.is('departments.detail.teams.detail.leaders') ||
      this.$state.is('teams.detail.objectives') ||
      this.$state.is('teams.detail.positions') ||
      this.$state.is('teams.detail.leaders')
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.teams.detail.component', [
]).component('departmentsDetailTeamsDetail', Detail).name;
