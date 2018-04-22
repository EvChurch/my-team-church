class PeopleController {
  constructor(
    $rootScope,
    people
  ) {
    this.$rootScope = $rootScope;
    this.people = people;
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
