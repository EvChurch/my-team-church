class EntitiesController {
  constructor(
    $q, $rootScope, $state, $stateParams,
    people, peopleDetailEntities
  ) {
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.people = people;
    this.peopleDetailEntities = peopleDetailEntities;

    this.list = [];
  }
  $onInit() {
    this.loadPersonId().then(() => this.load());
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
  loadPersonId() {
    if (this.$state.includes('me')) {
      return this.people.getMe().then((me) => this.personId = me.id);
    } else {
      this.personId = this.$stateParams.personId;
      return this.$q.resolve(this.personId);
    }
  }
}

let Entities = {
  template: require('./entities.html'),
  controller: EntitiesController
};

export default angular.module('app.components.people.detail.entities.component', [
]).component('peopleDetailEntities', Entities).name;
