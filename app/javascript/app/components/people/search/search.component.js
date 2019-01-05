import { concat } from 'lodash/fp';

class SearchController {
  constructor(
    $state,
    people
  ) {
    this.people = people;

    this.searchString = '';
    this.list = [];
    this.person = null;
  }
  search() {
    if (this.searchString === '') {
      this.list = [];
    } else {
      this.loading = true;
      this.people.load(this.searchString).then((people) => {
        this.loading = false;
        this.list = angular.copy(people);
        this.list.hasNextPage = people.hasNextPage;
      });
    }
  }
  loadMore() {
    this.loading = true;
    this.people.load(this.searchString, this.list[this.list.length - 1].cursor).then((people) => {
      this.loading = false;
      this.list = concat(this.list, angular.copy(people));
      this.list.hasNextPage = people.hasNextPage;
    });
  }
  setPerson(person = null) {
    const id = person ? person.id : null;
    this.person = person;
    this.searchString = '';
    this.list = [];
    this.setPersonId({ $id: id });
  }
}

let Search = {
  bindings: {
    setPersonId: '&'
  },
  template: require('./search.html'),
  controller: SearchController
};

export default angular.module('app.components.people.search.component', [
]).component('peopleSearch', Search).name;
