import { concat } from 'lodash/fp';

class SearchController {
  constructor(
    $state,
    people
  ) {
    this.people = people;

    this.searchString = '';
    this.data = [];
    this.person = null;
  }
  search() {
    if (this.searchString === '') {
      this.data = [];
    } else {
      this.people.load(this.searchString).then((data) => {
        this.data = data;
      });
    }
  }
  loadMore() {
    this.people.load(this.searchString, this.data[this.data.length - 1].cursor).then((data) => {
      this.data = concat(this.data, data);
      this.data.hasNextPage = data.hasNextPage;
    });
  }
  setPerson(person = null) {
    const id = person ? person.id : null;
    this.person = person;
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

export default angular.module('app.common.people.search.component', [
]).component('peopleSearch', Search).name;
