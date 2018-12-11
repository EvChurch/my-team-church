class PositionsController {
  constructor(
    $rootScope,
    departmentPositions
  ) {
    this.$rootScope = $rootScope;
    this.departmentPositions = departmentPositions;
    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('positionCreate', (_event, departmentId) => {
      if (departmentId === this.departmentId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('positionUpdate', (_event, departmentId) => {
      if (departmentId === this.departmentId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('positionDelete', (_event, departmentId) => {
      if (departmentId === this.departmentId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departmentPositions.load(this.departmentId).then((departmentPositions) => {
      this.loading = false;
      this.list = angular.copy(departmentPositions);
    });
  }
}

let Positions = {
  bindings: {
    departmentId: '<'
  },
  template: require('./positions.html'),
  controller: PositionsController
};

export default angular.module('app.components.departments.detail.positions.component', [
]).component('departmentsDetailPositions', Positions).name;
