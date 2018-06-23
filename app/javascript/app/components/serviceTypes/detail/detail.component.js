class DetailController {
  constructor(
    $state, $rootScope,
    serviceTypes
  ) {
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.serviceTypes = serviceTypes;
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('serviceTypeUpdate', (_event, serviceType) => {
      if (serviceType.id === this.serviceType.id) { this.serviceType = serviceType; }
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  save() {
    if (this.serviceType.id) {
      this.serviceTypes.update(this.serviceType.id, this.serviceType);
    } else {
      this.serviceTypes.create(this.serviceType).then((serviceType) => {
        this.serviceType = serviceType;
        this.$state.go('serviceTypes.detail', { serviceTypeId: serviceType.id });
      });
    }
  }
  delete() {
    return this.serviceTypes.delete(this.serviceType.id).then(() => {
      this.$state.go('serviceTypes');
    });
  }
}

let Detail = {
  bindings: {
    serviceType: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

import serviceTypes from '../serviceTypes.service';

export default angular.module('app.components.serviceTypes.detail.component', [
  serviceTypes
]).component('serviceTypesDetail', Detail).name;
