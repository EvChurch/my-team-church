import { reject } from 'lodash/fp';

class ItemController {
  constructor(
      $rootScope
  ) {
      this.$rootScope = $rootScope;
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on(
      'serviceTypeConnectionCreate', (_event, resourceId, resourceType, serviceTypeConnection
    ) => {
      if (resourceId === this.leader.id && resourceType === 'department_leader') {
        this.leader.service_types.push(serviceTypeConnection.service_type);
      }
    });
    this.watcher1 = this.$rootScope.$on(
      'serviceTypeConnectionDelete', (_event, resourceId, resourceType, serviceTypeConnection
    ) => {
      if (resourceId === this.leader.id && resourceType === 'department_leader') {
        this.leader.service_types = reject({'id': serviceTypeConnection.service_type.id}, this.leader.service_types)
      }
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
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
