  class DetailController {
  constructor(
    $rootScope, $state, $stateParams, $transitions,
    departmentsDetailTeamsDetailPositions
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$transitions = $transitions;
    this.departmentsDetailTeamsDetailPositions = departmentsDetailTeamsDetailPositions;
  }
  $onInit() {
    this.loading = true;
    this.departmentsDetailTeamsDetailPositions.get(this.$stateParams.positionId).then((position) => {
      this.position = position;
      this.loading = false;
    }).catch((ex) => {
      this.$state.go('departments.detail.teams.detail.positions');
      throw ex;
    });
    this.watcher0 = this.$rootScope.$on('positionUpdate', (_event, teamId, position) => {
      if (position.id === this.position.id) this.position = position;
    });
    this.watcher1 = this.$rootScope.$on('positionDelete', (_event, teamId, position) => {
      if (position.id === this.position.id) this.$state.go('departments.detail.teams.detail.positions');
    });
    this.$state.go('.entities');
    this.$transitions.onSuccess({}, (transition) => {
      if (
        transition.to().name == 'departments.detail.teams.detail.positions.detail' ||
        transition.to().name == 'teams.detail.positions.detail'
      ) {
        this.$state.go('.entities');
      }
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  visibleOnMobile() {
    return this.$state.is('departments.detail.teams.detail.positions.detail.entities') ||
    this.$state.is('departments.detail.teams.detail.positions.detail.objectives') ||
    this.$state.is('departments.detail.teams.detail.positions.detail.items') ||
    this.$state.is('departments.detail.teams.detail.positions.detail.jobDescription') ||
    this.$state.is('departments.detail.teams.detail.positions.detail.training') ||
    this.$state.is('teams.detail.positions.detail.entities') ||
    this.$state.is('teams.detail.positions.detail.objectives') ||
    this.$state.is('teams.detail.positions.detail.items') ||
    this.$state.is('teams.detail.positions.detail.jobDescription') ||
    this.$state.is('teams.detail.positions.detail.training');
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.component', [
]).component('departmentsDetailTeamsDetailPositionsDetail', Detail).name;
