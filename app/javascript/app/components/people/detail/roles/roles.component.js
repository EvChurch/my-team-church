class RolesController {
  constructor(
    $q, $rootScope, $state, $stateParams,
    people, peopleDetailRolesEntity, peopleDetailRoles
  ) {
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.people = people;
    this.peopleDetailRolesEntity = peopleDetailRolesEntity;
    this.peopleDetailRoles = peopleDetailRoles;

    this.entityList = [];
    this.departmentList = [];
    this.teamList = [];
    this.hideEntityList = false;
    this.hideDepartmentList = false;
    this.hideTeamList = false;
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
    this.$q.all([
      this.peopleDetailRolesEntity.load(this.personId).then((entities) => {
        this.entityList = angular.copy(entities);
      }),
      this.peopleDetailRoles.loadTeamLeaders(this.personId).then((roles) => {
        this.teamList = angular.copy(roles);
      }),
      this.peopleDetailRoles.loadDepartmentLeaders(this.personId).then((roles) => {
        this.departmentList = angular.copy(roles);
      })
    ]).then(() => {
      this.loading = false;
    })
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

let Roles = {
  template: require('./roles.html'),
  controller: RolesController
};

export default angular.module('app.components.people.detail.roles.component', [
]).component('peopleDetailRoles', Roles).name;
