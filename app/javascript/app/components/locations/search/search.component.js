import { concat } from 'lodash/fp';

class SearchController {
  constructor(
    $state,
    locations
  ) {
    this.locations = locations;

    this.searchString = '';
    this.data = [];
    this.location = null;
  }
  search() {
    if (this.searchString === '') {
      this.data = [];
    } else {
      this.locations.load(this.searchString).then((data) => {
        this.data = data;
      });
    }
  }
  loadMore() {
    this.locations.load(this.searchString, this.data[this.data.length - 1].cursor).then((data) => {
      this.data = concat(this.data, data);
      this.data.hasNextPage = data.hasNextPage;
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
