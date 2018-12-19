class DetailController {
  constructor(
    $rootScope, $state,
    peopleDetailEntities, objectives
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.peopleDetailEntities = peopleDetailEntities;
    this.objectives = objectives;
  }
  $onInit() {
    this.$state.go('.objectives');
    this.watcher0 = this.$rootScope.$on('personPositionEntityDelete', (_event, _personId, positionEntity) => {
      if (positionEntity.id === this.positionEntity.id) this.$state.go('people.detail.entities');
    });
  }
  $onDestroy() {
    this.watcher0();
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.people.detail.entities.detail.component', [
]).component('peopleDetailEntitiesDetail', Detail).name;
