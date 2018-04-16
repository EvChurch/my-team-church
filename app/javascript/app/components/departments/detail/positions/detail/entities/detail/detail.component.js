class DetailController {
  constructor(
    $rootScope, $state,
    departmentPositionEntities, objectives
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departmentPositionEntities = departmentPositionEntities;
    this.objectives = objectives;
  }
  $onInit() {
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
    positionId: '<',
    entity: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.positions.detail.entities.detail.component', [
]).component('departmentsDetailPositionsDetailEntitiesDetail', Detail).name;
