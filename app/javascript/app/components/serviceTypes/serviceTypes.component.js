class ServiceTypesController {
  constructor(
    $rootScope, $state,
    serviceTypes
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.serviceTypes = serviceTypes;

    this.list = [];
    this.searchString = '';
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('serviceTypeCreate', () => this.load());
    this.watcher1 = this.$rootScope.$on('serviceTypeUpdate', () => this.load());
    this.watcher2 = this.$rootScope.$on('serviceTypeDelete', () => this.load());

    this.load();
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.serviceTypes.load().then((serviceTypes) => {
      this.loading = false;
      this.list = angular.copy(serviceTypes);
    });
  }
}

let ServiceTypes = {
  bindings: {},
  template: require('./serviceTypes.html'),
  controller: ServiceTypesController
};

import serviceTypes from './serviceTypes.service';

export default angular.module('app.components.serviceTypes.component', [
  serviceTypes
]).component('serviceTypes', ServiceTypes).name;
