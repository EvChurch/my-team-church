  class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentPositions, departmentPositionEntities, objectives
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentPositions = departmentPositions;
    this.departmentPositionEntities = departmentPositionEntities;
    this.objectives = objectives;
  }
  $onInit() {
    this.loading = true;
    this.departmentPositions.get(this.$stateParams.departmentId, this.$stateParams.positionId).then((position) => {
      this.position = position;
      this.loading = false;
    }).catch((ex) => {
      this.$state.go('departments.detail.positions');
      throw ex;
    });
    this.$state.go('.entities');
    this.watcher0 = this.$rootScope.$on('positionUpdate', (_event, departmentId, position) => {
      if (position.id === this.position.id) this.position = position;
    });
    this.watcher1 = this.$rootScope.$on('positionDelete', (_event, departmentId, position) => {
      if (position.id === this.position.id) this.$state.go('^');
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
}

let Detail = {
  bindings: {
    departmentId: '<',
    position: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.positions.detail.component', [
]).component('departmentsDetailPositionsDetail', Detail).name;
