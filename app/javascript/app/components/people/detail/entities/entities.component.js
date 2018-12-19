class EntitiesController {
  constructor(
    $rootScope, $state,
    peopleDetailEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.peopleDetailEntities = peopleDetailEntities;

    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('entityDelete', (_event, personId) => {
      if (personId === this.personId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  load() {
    this.loading = true;
    this.peopleDetailEntities.load(this.personId).then((entities) => {
      this.loading = false;
      this.list = angular.copy(entities);
    });
  }
}

let Entities = {
  bindings: {
    personId: '<'
  },
  template: require('./entities.html'),
  controller: EntitiesController
};

export default angular.module('app.components.people.detail.entities.component', [
]).component('peopleDetailEntities', Entities).name;
