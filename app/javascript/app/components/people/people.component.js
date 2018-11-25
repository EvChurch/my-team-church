import { concat } from 'lodash/fp';

class PeopleController {
  constructor(
    $rootScope,
    $state,
    people
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.people = people;

    this.list = [];
    this.searchString = '';
  }
  $onInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.people.load(this.searchString).then((people) => {
      this.loading = false;
      this.list = angular.copy(people);
    });
  }
  loadMore() {
    this.loading = true;
    this.people.load(this.searchString, this.list[this.list.length - 1].cursor).then((people) => {
      this.loading = false;
      this.list = concat(this.list, angular.copy(people));
      this.list.hasNextPage = list.hasNextPage;
    });
  }
}

let People = {
  template: require('./people.html'),
  controller: PeopleController
};

import people from './people.service';

export default angular.module('app.components.people.component', [
  people
]).component('people', People).name;
