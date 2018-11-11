class DetailController {
  constructor(
    $location, $state, $stateParams, $rootScope,
    people
  ) {
    this.$location = $location;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.people = people;
  }
  $onInit() {
    this.loading = true;
    (this.$stateParams.personId ? this.people.get(this.$stateParams.personId) : this.people.getMe()).then((person) => {
      this.loading = false;
      this.person = person;
    }).catch((ex) => {
      this.$state.go('people');
      throw ex;
    });
    this.watcher0 = this.$rootScope.$on('personUpdate', (_event, person) => {
      if (person.id === this.person.id) { this.person = person; }
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  save() {
    if (this.person.id) {
      this.people.update(this.person.id, this.person);
    } else {
      this.people.create(this.person).then((person) => {
        this.person = person;
      });
    }
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

import people from '../people.service';

export default angular.module('app.components.people.detail.component', [
  people
]).component('peopleDetail', Detail).name;
