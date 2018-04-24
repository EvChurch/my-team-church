class DetailController {
  constructor(people) {
    this.people = people;
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('personUpdate', (_event, person) => {
      if (person.id === this.person.id) { this.person = person; }
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  save() {
    this.people.update(this.person.id, this.person);
  }
}

let Detail = {
  bindings: {
    person: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

import people from '../people.service';

export default angular.module('app.components.people.detail.component', [
  people
]).component('peopleDetail', Detail).name;
