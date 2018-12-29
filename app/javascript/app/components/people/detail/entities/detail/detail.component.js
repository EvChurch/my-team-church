class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    peopleDetailEntities
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.peopleDetailEntities = peopleDetailEntities;
  }
  $onInit() {
    this.load();
    this.$state.go('.objectives');
    this.watcher0 = this.$rootScope.$on('entityDelete', (_event, _personId, entity) => {
      if (entity.id === this.entity.id) {
        if (this.$state.includes('me')) {
          this.$state.go('me.entities');
        } else {
          this.$state.go('people.detail.entities');
        }
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
