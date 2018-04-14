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
    this.watcher0 = this.$rootScope.$on('positionEntityDelete', (_event, departmentId, position) => {
      if (position.id === this.position.id) this.$state.go('^');
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
