import { concat } from 'lodash/fp';

class LocationsController {
  constructor(
    $rootScope,
    locations
  ) {
    this.$rootScope = $rootScope;
    this.locations = locations;

    this.data = [];
    this.searchString = '';
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('locationCreate', () => this.load());
    this.watcher1 = this.$rootScope.$on('locationUpdate', () => this.load());
    this.watcher2 = this.$rootScope.$on('locationDelete', () => this.load());

    this.load();
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.locations.load().then((data) => {
      this.data = data;
    });
  }
}

let Locations = {
  bindings: {},
  template: require('./locations.html'),
  controller: LocationsController
};

import locations from './locations.service';

export default angular.module('app.components.locations.component', [
  locations
]).component('locations', Locations).name;
