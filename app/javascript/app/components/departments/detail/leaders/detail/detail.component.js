import { find } from 'lodash/fp';

class DetailController {
  constructor(
    $rootScope, $state, $stateParams, $transitions,
    departmentsDetailLeaders
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$transitions = $transitions;
    this.departmentsDetailLeaders = departmentsDetailLeaders;
  }
  $onInit() {
    this.loading = true;
    this.departmentsDetailLeaders.get(this.$stateParams.leaderId).then((leader) => {
      this.loading = false;
      this.leader = leader;
    }).catch((ex) => {
      this.$state.go('departments.detail.leaders');
      throw ex;
    });
    this.watcher0 = this.$rootScope.$on('leaderDelete', (_event, departmentId, leader) => {
      if (leader.id === this.leader.id) this.$state.go('departments.detail.leaders');
    });
    this.$state.go('.objectives');
    this.$transitions.onSuccess({}, (transition) => {
      if (transition.to().name == 'departments.detail.leaders.detail' ||
          transition.to().name == 'me.roles.departmentLeader' ||
          transition.to().name == 'people.detail.roles.departmentLeader') {
        this.$state.go('.objectives');
      }
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

export default angular.module('app.components.departments.detail.leaders.detail.component', [
]).component('departmentsDetailLeadersDetail', Detail).name;
