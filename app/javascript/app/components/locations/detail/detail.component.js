class DetailController {
  constructor(
    $state, $rootScope,
    locations
  ) {
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.locations = locations;
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('locationUpdate', (_event, location) => {
      if (location.id === this.location.id) { this.location = location; }
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  save() {
    if (this.location.id) {
      this.locations.update(this.location.id, this.location);
    } else {
      this.locations.create(this.location).then((location) => {
        this.location = location;
        this.$state.go('locations.detail', { locationId: location.id });
      });
    }
  }
  delete() {
    return this.locations.delete(this.location.id).then(() => {
      this.$state.go('locations');
    });
  }
}

let Detail = {
  bindings: {
    location: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

import locations from '../locations.service';

export default angular.module('app.components.locations.detail.component', [
  locations
]).component('locationsDetail', Detail).name;
