import { concat } from 'lodash/fp';

class LocationsController {
  constructor(
    $rootScope, $state,
    locations
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.locations = locations;

    this.list = [];
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
    this.loading = true;
    this.locations.load().then((locations) => {
      this.loading = false;
      this.list = angular.copy(locations);
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
