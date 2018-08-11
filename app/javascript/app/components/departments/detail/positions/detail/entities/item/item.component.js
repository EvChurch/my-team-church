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
      if (resourceId === this.entity.id && resourceType === 'position_entity') {
        this.entity.service_types.push(serviceTypeConnection.service_type);
      }
    });
    this.watcher1 = this.$rootScope.$on(
      'serviceTypeConnectionDelete', (_event, resourceId, resourceType, serviceTypeConnection
    ) => {
      if (resourceId === this.entity.id && resourceType === 'position_entity') {
        this.entity.service_types = reject({'id': serviceTypeConnection.service_type.id}, this.entity.service_types)
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
    entity: '<'
  },
  template: require('./item.html'),
  controller: ItemController
};

export default angular.module('app.components.departments.detail.positions.detail.entities.item.component', [
]).component('departmentsDetailPositionsDetailEntitiesItem', Item).name;
