class DetailController {
  constructor(
    $location, $q, $state, $stateParams, $rootScope, toastr,
    people
  ) {
    this.$location = $location;
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.toastr = toastr;
    this.people = people;
  }
  $onInit() {
    this.loading = true;
    this.load().then((person) => {
      this.loading = false;
      this.person = angular.copy(person);
    }).catch((ex) => {
      this.$state.go('people');
      throw ex;
    });
    this.watcher0 = this.$rootScope.$on('personUpdate', (_event, person) => {
      if (person.id === this.person.id) { this.person = angular.copy(person); }
    });
  }
  $onDestroy() {
    this.watcher0();
  }
  save(form) {
    this.saving = true;
    if (this.person.id) {
      this.people.update(this.person.id, this.person).then((person) => {
        this.person = person;
        form.$setPristine();
        this.saving = false;
      });
    } else {
      this.people.create(this.person).then((person) => {
        form.$setPristine();
        this.saving = false;
        this.$state.go('people.detail', { personId: person.id });
      });
    }
  }
  load() {
    if (this.$state.includes('me')) {
      return this.people.getMe();
    } else if (this.$state.is('people.new')) {
      return this.$q.resolve({});
    } else {
      return this.people.get(this.$stateParams.personId);
    }
  }
  invite() {
    this.people.invite(this.$stateParams.personId).then((person) => {
      this.person.invitable = person.invitable;
      this.toastr.success('Email will be sent in the background.', 'Invite email scheduled successfully!');
    }).catch((error) => {
      this.toastr.error('Please review this person and try again!', 'Error sending an invite');
    });
  }
}

let Detail = {
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.people.detail.component', [
]).component('peopleDetail', Detail).name;
