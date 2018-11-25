import { concat } from 'lodash/fp';

class SearchController {
  constructor(
    $state,
    locations
  ) {
    this.locations = locations;

    this.searchString = '';
    this.list = [];
    this.location = null;
  }
  search() {
    if (this.searchString === '') {
      this.list = [];
    } else {
      this.loading = true;
      this.locations.load(this.searchString).then((locations) => {
        this.loading = false;
        this.list = locations;
      });
    }
  }
  loadMore() {
    this.loading = true;
    this.locations.load(this.searchString, this.list[this.list.length - 1].cursor).then((locations) => {
      this.loading = false;
      this.list = concat(this.list, angular.copy(locations));
      this.list.hasNextPage = locations.hasNextPage;
    });
  }
  setLocation(location = null) {
    const id = location ? location.id : null;
    this.location = location;
    this.setLocationId({ $id: id });
  }
}

let Search = {
  bindings: {
    setLocationId: '&'
  },
  template: require('./search.html'),
  controller: SearchController
};

export default angular.module('app.components.locations.search.component', [
]).component('locationsSearch', Search).name;
