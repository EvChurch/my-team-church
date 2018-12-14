class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentsDetailTeamsDetailPositionsDetailEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositionsDetailEntities = departmentsDetailTeamsDetailPositionsDetailEntities;
  }
  $onInit() {
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
    this.$state.go('.objectives');
    this.watcher0 = this.$rootScope.$on('entityDelete', (_event, _positionId, entity) => {
      if (entity.id === this.entity.id) this.$state.go('departments.detail.teams.detail.positions.detail.entities');
    });
  }
  $onDestroy() {
    this.watcher0();
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module(
  'app.components.departments.detail.teams.detail.positions.detail.entities.detail.component', []
).component('departmentsDetailTeamsDetailPositionsDetailEntitiesDetail', Detail).name;
