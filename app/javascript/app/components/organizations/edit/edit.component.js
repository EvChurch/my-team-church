class EditController {
  constructor(
    $state,
    countriesAndTimezones,
    organizations
  ) {
    this.$state = $state;
    this.countriesAndTimezones = countriesAndTimezones;
    this.organizations = organizations;
  }
  $onInit() {
    this.id = this.organization.id;
    this.organization = {
      name: this.organization.name,
      website_url: this.organization.website_url,
      address_1: this.organization.address_1,
      address_2: this.organization.address_2,
      city: this.organization.city,
      state: this.organization.state,
      zip: this.organization.zip,
      country: this.organization.country,
      time_zone: this.organization.time_zone
    };
  }
  submit() {
    this.loading = true;
    this.organizations.update(this.id, this.organization).then(() => {
      this.loading = false;
      this.$state.go('home');
    });
  }
}

let Edit = {
  bindings: {
    organization: '<'
  },
  template: require('./edit.html'),
  controller: EditController
};

export default angular.module('app.components.organizations.edit.component', [
]).component('organizationsEdit', Edit).name;
