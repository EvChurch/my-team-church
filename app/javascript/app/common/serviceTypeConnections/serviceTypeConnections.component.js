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
  }
  load() {
    this.loadServiceTypes();
    this.loadServiceTypeConnections();
  }
  loadServiceTypes() {
    return this.serviceTypes.load().then((data) => {
      this.serviceTypeList = angular.copy(data);
    });
  }
  loadServiceTypeConnections() {
    return this.serviceTypeConnections.load(this.resourceId, this.resourceType).then((data) => {
      this.data = angular.copy(data);
    });
  }
  ServiceTypeConnectionByServiceType(serviceType) {
    return find({ 'service_type': { 'id': serviceType.id } }, this.data);
  }
  toggleServiceTypeConnectionByServiceType(serviceType) {
    const serviceTypeConnection = this.ServiceTypeConnectionByServiceType(serviceType);
    if (serviceTypeConnection) {
      this.serviceTypeConnections.delete(
        this.resourceId, this.resourceType, serviceTypeConnection.id
      ).then(() => this.loadServiceTypeConnections());
    } else {
      this.serviceTypeConnections.create(
        this.resourceId, this.resourceType, {
        service_type_id: serviceType.id
      }).then(() => this.loadServiceTypeConnections());
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
