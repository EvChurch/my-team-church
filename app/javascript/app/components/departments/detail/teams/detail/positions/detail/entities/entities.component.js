import { find, reduce } from 'lodash/fp';

class EntitiesController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentsDetailTeamsDetailPositionsDetailEntities, people
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositionsDetailEntities = departmentsDetailTeamsDetailPositionsDetailEntities;
    this.people = people;
    this.myList = [];
    this.hideMyList = false;
    this.assignedList = [];
    this.hideAssignedList = false;
    this.unassignedList = [];
    this.hideUnassignedList = false;
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('entityCreate', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('entityUpdate', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('entityDelete', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departmentsDetailTeamsDetailPositionsDetailEntities.load(this.$stateParams.positionId).then(
      (entities) => {
        return this.people.getMe().then((me) => {
          this.loading = false;
          this.myList = reduce((result, entity) => {
            const leader = find((leader) => leader.person.id == me.id, entity.leaders);
            if (leader) {
              result.push(entity);
            }
            return result;
          }, [], entities);
          this.assignedList = reduce((result, entity) => {
            const leader = find((leader) => leader.person.id == me.id, entity.leaders);
            if (!leader && entity.leaders.length !== 0) {
              result.push(entity);
            }
            return result;
          }, [], entities);
          this.unassignedList = reduce((result, entity) => {
            if (entity.leaders.length === 0) {
              result.push(entity);
            }
            return result;
          }, [], entities);
        });
      }
    );
  }
}

let Entities = {
  template: require('./entities.html'),
  controller: EntitiesController
};

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.entities.component', [
]).component('departmentsDetailTeamsDetailPositionsDetailEntities', Entities).name;
