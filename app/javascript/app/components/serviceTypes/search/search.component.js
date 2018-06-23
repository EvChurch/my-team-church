import { concat } from 'lodash/fp';

class SearchController {
  constructor(
    $state,
    serviceTypes
  ) {
    this.serviceTypes = serviceTypes;

    this.searchString = '';
    this.data = [];
    this.serviceType = null;
  }
  search() {
    if (this.searchString === '') {
      this.data = [];
    } else {
      this.serviceTypes.load(this.searchString).then((data) => {
        this.data = data;
      });
    }
  }
  loadMore() {
    this.serviceTypes.load(this.searchString, this.data[this.data.length - 1].cursor).then((data) => {
      this.data = concat(this.data, data);
      this.data.hasNextPage = data.hasNextPage;
    });
  }
  setServiceType(serviceType = null) {
    const id = serviceType ? serviceType.id : null;
    this.serviceType = serviceType;
    this.setServiceTypeId({ $id: id });
  }
}

let Search = {
  bindings: {
    setServiceTypeId: '&'
  },
  template: require('./search.html'),
  controller: SearchController
};

export default angular.module('app.components.serviceTypes.search.component', [
]).component('serviceTypesSearch', Search).name;
