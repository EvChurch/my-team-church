import { find } from 'lodash/fp';

class ServiceTypeConnectionsController {
  constructor(
    $rootScope, $state, $stateParams,
    serviceTypes, serviceTypeConnections
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.serviceTypes = serviceTypes;
    this.serviceTypeConnections = serviceTypeConnections;

    this.serviceTypeList = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('objectiveCreate', (_event, resourceId, resourceType) => {
      if (resourceId === this.resourceId && resourceType === this.resourceType) this.load();
    });
    this.watcher1 = this.$rootScope.$on('objectiveUpdate', (_event, resourceId, resourceType) => {
      if (resourceId === this.resourceId && resourceType === this.resourceType) this.load();
    });
    this.watcher2 = this.$rootScope.$on('objectiveDelete', (_event, resourceId, resourceType) => {
      if (resourceId === this.resourceId && resourceType === this.resourceType) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.serviceTypes.load().then((data) => {
      this.serviceTypeList = angular.copy(data);
    });
    this.serviceTypeConnections.load(this.resourceId, this.resourceType).then((data) => {
      this.data = angular.copy(data);
    });
  }
  activeServiceType(serviceType) {
    return find({ 'service_type': { 'id': serviceType.id } }, this.data);
  }
  toggleServiceType(serviceType) {
    const leaderServiceType = this.activeServiceType(serviceType);
    if (leaderServiceType) {
      this.serviceTypeConnections.delete(
        this.resourceId, this.resourceType, leaderServiceType.id
      )
    } else {
      this.serviceTypeConnections.create(
        this.resourceId, this.resourceType, {
        service_type_id: serviceType.id
      });
    }
  }
}

let serviceTypeConnections = {
  bindings: {
    resourceId: '<',
    resourceType: '<'
  },
  template: require('./serviceTypeConnections.html'),
  controller: ServiceTypeConnectionsController
};

export default angular.module('app.common.serviceTypeConnections.component', [
]).component('serviceTypeConnections', serviceTypeConnections).name;
