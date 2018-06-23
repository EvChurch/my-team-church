import { concat } from 'lodash/fp';

class ServiceTypesController {
  constructor(
    $rootScope,
    serviceTypes
  ) {
    this.$rootScope = $rootScope;
    this.serviceTypes = serviceTypes;

    this.data = [];
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
    this.serviceTypes.load().then((data) => {
      this.data = data;
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