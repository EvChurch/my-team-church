import { find } from 'lodash/fp';

class DetailController {
  constructor(
    $rootScope, $state,
    departmentLeaders
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departmentLeaders = departmentLeaders;
  }
  $onInit() {
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
