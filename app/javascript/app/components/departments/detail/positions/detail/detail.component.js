class DetailController {
  constructor(
    $rootScope, $state,
    departmentPositions
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departmentPositions = departmentPositions;
  }
  $onInit() {
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
