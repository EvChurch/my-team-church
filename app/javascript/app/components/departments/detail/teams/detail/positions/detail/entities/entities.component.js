class EntitiesController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentsDetailTeamsDetailPositionsDetailEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositionsDetailEntities = departmentsDetailTeamsDetailPositionsDetailEntities;
    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('entityCreate', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('entityUpdate', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('entityDelete', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departmentsDetailTeamsDetailPositionsDetailEntities.load(this.$stateParams.positionId).then(
      (entities) => {
        this.loading = false;
        this.list = angular.copy(entities);
      }
    );
  }
}

let Entities = {
  template: require('./entities.html'),
  controller: EntitiesController
};

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.entities.component', [
]).component('departmentsDetailTeamsDetailPositionsDetailEntities', Entities).name;
