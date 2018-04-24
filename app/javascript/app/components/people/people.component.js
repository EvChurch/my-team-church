import { concat } from 'lodash/fp';

class PeopleController {
  constructor(
    $rootScope,
    people
  ) {
    this.$rootScope = $rootScope;
    this.people = people;

    this.data = [];
    this.searchString = '';
  }
  $onInit() {
    this.load();
  }
  loadMore() {
    this.people.load(this.searchString, this.data[this.data.length - 1].cursor).then((data) => {
      this.data = concat(this.data, data);
      this.data.hasNextPage = data.hasNextPage;
    });
  }
  load() {
    this.people.load(this.searchString).then((data) => {
      this.data = data;
    });
  }
}

let People = {
  bindings: {},
  template: require('./people.html'),
  controller: PeopleController
};

import people from './people.service';

export default angular.module('app.components.people.component', [
  people
]).component('people', People).name;
