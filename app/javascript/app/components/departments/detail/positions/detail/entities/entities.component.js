class EntitiesController {
  constructor(
    $rootScope, $state,
    departmentPositionEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departmentPositionEntities = departmentPositionEntities;
  }
}

let Entities = {
  bindings: {
    departmentId: '<',
    positionId: '<',
    entities: '<'
  },
  template: require('./entities.html'),
  controller: EntitiesController
};

export default angular.module('app.components.departments.detail.positions.detail.entities.component', [
]).component('departmentsDetailPositionsDetailEntities', Entities).name;
