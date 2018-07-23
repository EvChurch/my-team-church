import { find } from 'lodash/fp';

class ItemController {
  constructor(
      $rootScope
  ) {
      this.$rootScope = $rootScope;
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('departmentLeaderUpdate', (_event, departmentId, leader) => {
      if (leader.id === this.leader.id) this.leader = leader;
    });
  }
  $onDestroy() {
    this.watcher0();
  }
}

let Item = {
  bindings: {
    leader: '<'
  },
  template: require('./item.html'),
  controller: ItemController
};

export default angular.module('app.components.departments.detail.leaders.item.component', [
]).component('departmentsDetailLeadersItem', Item).name;
