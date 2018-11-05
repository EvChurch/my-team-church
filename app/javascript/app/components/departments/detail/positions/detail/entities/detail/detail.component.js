class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentPositionEntities, objectives
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentPositionEntities = departmentPositionEntities;
    this.objectives = objectives;
  }
  $onInit() {
    this.loading = true;
    this.departmentPositionEntities.get(
      this.$stateParams.positionId, this.$stateParams.entityId
    ).then((entity) => {
      this.entity = entity;
      this.loading = false;
    }).catch((ex) => {
      this.$state.go('departments.detail.positions.detail.entities');
      throw ex;
    });
    this.$state.go('.objectives');
    this.watcher0 = this.$rootScope.$on('departmentPositionEntityDelete', (_event, positionId, entity) => {
      if (entity.id === this.entity.id) this.$state.go('departments.detail.position');
    });
  }
  $onDestroy() {
    this.watcher0();
  }
}

let Detail = {
  bindings: {
    positionId: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.positions.detail.entities.detail.component', [
]).component('departmentsDetailPositionsDetailEntitiesDetail', Detail).name;
