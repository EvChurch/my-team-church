class EntitiesController {
  constructor(
    $rootScope, $state, $stateParams,
    peopleDetailEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.peopleDetailEntities = peopleDetailEntities;

    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('entityDelete', (_event, personId) => {
      if (personId === this.$stateParams.personId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  load() {
    this.loading = true;
    this.peopleDetailEntities.load(this.$stateParams.personId).then((entities) => {
      this.loading = false;
      this.list = angular.copy(entities);
    });
  }
}

let Entities = {
  template: require('./entities.html'),
  controller: EntitiesController
};

export default angular.module('app.components.people.detail.entities.component', [
]).component('peopleDetailEntities', Entities).name;
