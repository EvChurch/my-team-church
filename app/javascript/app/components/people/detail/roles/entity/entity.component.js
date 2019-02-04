class EntityController {
  constructor(
    $rootScope, $state, $stateParams, $transitions,
    peopleDetailRolesEntity
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$transitions = $transitions;
    this.peopleDetailRolesEntity = peopleDetailRolesEntity;
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('entityDelete', (_event, _personId, entity) => {
      if (entity.id === this.entity.id) {
        if (this.$state.includes('me')) {
          this.$state.go('me.roles');
        } else {
          this.$state.go('people.detail.roles');
        }
      }
    });
    this.$state.go('.objectives');
    this.$transitions.onSuccess({}, (transition) => {
      if (
        transition.to().name == 'people.detail.roles.entity' ||
        transition.to().name == 'me.roles.entity'
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
    this.peopleDetailRolesEntity.get(
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

let Entity = {
  template: require('./entity.html'),
  controller: EntityController
};

export default angular.module('app.components.people.detail.roles.entity.component', [
]).component('peopleDetailRolesEntity', Entity).name;
