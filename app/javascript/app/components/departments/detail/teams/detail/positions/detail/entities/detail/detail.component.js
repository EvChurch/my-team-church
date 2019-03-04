class DetailController {
  constructor(
    $rootScope, $state, $stateParams, $transitions,
    departmentsDetailTeamsDetailPositionsDetailEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$transitions = $transitions;
    this.departmentsDetailTeamsDetailPositionsDetailEntities = departmentsDetailTeamsDetailPositionsDetailEntities;
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('entityDelete', (_event, _positionId, entity) => {
      if (entity.id === this.entity.id) this.$state.go('departments.detail.teams.detail.positions.detail.entities');
    });
    this.watcher1 = this.$rootScope.$on('entityUpdate', (_event, _positionId, entity) => {
      if (entity.id === this.entity.id) this.entity = entity;
    });
    this.$state.go('.objectives');
    this.$transitions.onSuccess({}, (transition) => {
      if (
        transition.to().name == 'departments.detail.teams.detail.positions.detail.entities.detail' ||
        transition.to().name == 'teams.detail.positions.detail.entities.detail'
        ) {
        this.$state.go('.objectives');
      }
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  load() {
    this.loading = true;
    this.departmentsDetailTeamsDetailPositionsDetailEntities.get(
      this.$stateParams.entityId
    ).then((entity) => {
      this.entity = entity;
      this.loading = false;
    }).catch((ex) => {
      this.$state.go('departments.detail.teams.detail.positions.detail.entities');
      throw ex;
    });
  }
  visibleOnMobile() {
    return this.$state.is('departments.detail.teams.detail.positions.detail.entities.detail.objectives') ||
      this.$state.is('teams.detail.positions.detail.entities.detail.objectives');
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module(
  'app.components.departments.detail.teams.detail.positions.detail.entities.detail.component', []
).component('departmentsDetailTeamsDetailPositionsDetailEntitiesDetail', Detail).name;
