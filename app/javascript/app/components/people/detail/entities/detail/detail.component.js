class DetailController {
  constructor(
    $rootScope, $state, $stateParams, $transitions,
    peopleDetailEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$transitions = $transitions;
    this.peopleDetailEntities = peopleDetailEntities;
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('entityDelete', (_event, _personId, entity) => {
      if (entity.id === this.entity.id) {
        if (this.$state.includes('me')) {
          this.$state.go('me.entities');
        } else {
          this.$state.go('people.detail.entities');
        }
      }
    });
    this.$state.go('.objectives');
    this.$transitions.onSuccess({}, (transition) => {
      if (
        transition.to().name == 'people.detail.entities.detail' ||
        transition.to().name == 'me.entities.detail'
      ) {
        this.$state.go('.objectives');
      }
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  load() {
    this.loading = true;
    this.peopleDetailEntities.get(
      this.$stateParams.entityId
    ).then((entity) => {
      this.entity = entity;
      this.loading = false;
    }).catch((ex) => {
      this.$state.go('people.detail.entities');
      throw ex;
    });
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.people.detail.entities.detail.component', [
]).component('peopleDetailEntitiesDetail', Detail).name;
