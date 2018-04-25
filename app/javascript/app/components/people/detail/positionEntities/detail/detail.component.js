class DetailController {
  constructor(
    $rootScope, $state,
    personPositionEntities, objectives
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.personPositionEntities = personPositionEntities;
    this.objectives = objectives;
  }
  $onInit() {
    this.$state.go('.objectives');
    this.watcher0 = this.$rootScope.$on('personPositionEntityDelete', (_event, personId, positionEntity) => {
      if (positionEntity.id === this.positionEntity.id) this.$state.go('people.detail.positionEntities');
    });
  }
  $onDestroy() {
    this.watcher0();
  }
}

let Detail = {
  bindings: {
    personId: '<',
    positionEntity: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

import personPositionEntities from '../positionEntities.service';

export default angular.module('app.components.people.detail.positionEntities.detail.component', [
  personPositionEntities
]).component('peopleDetailPositionEntitiesDetail', Detail).name;
