import { find } from 'lodash/fp';

class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentsDetailTeamsDetailLeaders
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailLeaders = departmentsDetailTeamsDetailLeaders;
  }
  $onInit() {
    this.loading = true;
    this.departmentsDetailTeamsDetailLeaders.get(this.$stateParams.leaderId).then((leader) => {
      this.loading = false;
      this.leader = leader;
    }).catch((ex) => {
      this.$state.go('departments.detail.teams.detail.leaders');
      throw ex;
    });
    this.watcher0 = this.$rootScope.$on('leaderDelete', (_event, _teamId, leader) => {
      if (leader.id === this.leader.id) this.$state.go('departments.detail.teams.detail.leaders');
    });
    this.$state.go('.objectives');
  }
  $onDestroy() {
    this.watcher0();
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.teams.detail.leaders.detail.component', [
]).component('departmentsDetailTeamsDetailLeadersDetail', Detail).name;
