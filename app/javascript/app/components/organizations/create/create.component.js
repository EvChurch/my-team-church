class CreateController {
  constructor($state, countriesAndTimezones, organizations) {
    this.$state = $state;
    this.countriesAndTimezones = countriesAndTimezones;
    this.organizations = organizations;
    this.organization = {};
  }
  submit() {
    this.loading = true;
    this.organizations.create(this.organization).then(() => {
      this.loading = false;
      this.$state.go('home');
    });
  }
}

let Create = {
  bindings: {},
  template: require('./create.html'),
  controller: CreateController
};

export default angular.module('app.components.organizations.create.component', [
]).component('organizationsCreate', Create).name;
