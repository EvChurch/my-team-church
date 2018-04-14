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
    this.people.load(this.searchString).then((data) => {
      this.data = data;
    });
  }
  setPerson(person = null) {
    this.person = person;
    const id = person ? person.id : null;
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
