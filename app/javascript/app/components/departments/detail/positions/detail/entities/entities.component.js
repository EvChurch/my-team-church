class EntitiesController {
  constructor(
    $rootScope, $state,
    departmentPositionEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departmentPositionEntities = departmentPositionEntities;
    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('departmentPositionEntityCreate', (_event, positionId) => {
      if (positionId === this.positionId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('departmentPositionEntityUpdate', (_event, positionId) => {
      if (positionId === this.positionId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('departmentPositionEntityDelete', (_event, positionId) => {
      if (positionId === this.positionId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departmentPositionEntities.load(this.positionId).then((departmentPositionEntities) => {
      this.loading = false;
      this.list = angular.copy(departmentPositionEntities);
    });
  }
}

let Entities = {
  bindings: {
    positionId: '<',
    entities: '<'
  },
  template: require('./entities.html'),
  controller: EntitiesController
};

export default angular.module('app.components.departments.detail.positions.detail.entities.component', [
]).component('departmentsDetailPositionsDetailEntities', Entities).name;
