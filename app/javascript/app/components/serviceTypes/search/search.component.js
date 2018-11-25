import { concat } from 'lodash/fp';

class SearchController {
  constructor(
    $state,
    serviceTypes
  ) {
    this.serviceTypes = serviceTypes;

    this.searchString = '';
    this.list = [];
    this.serviceType = null;
  }
  search() {
    if (this.searchString === '') {
      this.list = [];
    } else {
      this.loading = true;
      this.serviceTypes.load(this.searchString).then((serviceTypes) => {
        this.loading = false;
        this.list = serviceTypes;
      });
    }
  }
  loadMore() {
    this.loading = true;
    this.serviceTypes.load(this.searchString, this.list[this.list.length - 1].cursor).then((serviceTypes) => {
      this.loading = false;
      this.list = concat(this.list, angular.copy(serviceTypes));
      this.list.hasNextPage = serviceTypes.hasNextPage;
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
