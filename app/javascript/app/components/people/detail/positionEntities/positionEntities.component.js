class PositionEntitiesController {
  constructor(
    $rootScope, $state,
    personPositionEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.personPositionEntities = personPositionEntities;
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('personPositionEntityDelete', (_event, personId) => {
      if (personId === this.personId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  load() {
    this.loading = true;
    this.personPositionEntities.load(this.personId).then((data) => {
      this.loading = false;
      this.list = angular.copy(data);
    });
  }
}

let PositionEntities = {
  bindings: {
    personId: '<'
  },
  template: require('./positionEntities.html'),
  controller: PositionEntitiesController
};

import personPositionEntities from './positionEntities.service';

export default angular.module('app.components.people.detail.positionEntities.component', [
  personPositionEntities
]).component('peopleDetailPositionEntities', PositionEntities).name;
