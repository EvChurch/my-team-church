import { find } from 'lodash/fp';

class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentLeaders
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentLeaders = departmentLeaders;
  }
  $onInit() {
    this.loading = true;
    this.departmentLeaders.get(this.$stateParams.departmentId, this.$stateParams.leaderId).then((leader) => {
      this.loading = false;
      this.leader = leader;
    }).catch((ex) => {
      $state.go('departments.detail.leaders');
      throw ex;
    });
    this.watcher0 = this.$rootScope.$on('departmentLeaderDelete', (_event, departmentId, leader) => {
      if (leader.id === this.leader.id) this.$state.go('departments.detail.leaders');
    });
    this.$state.go('.objectives');
  }
  $onDestroy() {
    this.watcher0();
  }
}

let Detail = {
  bindings: {
    leader: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.leaders.detail.component', [
]).component('departmentsDetailLeadersDetail', Detail).name;
