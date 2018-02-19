class OrganizationsController {
  constructor(organizations) {
    this.organizations = organizations;
  }
}

let Organizations = {
  bindings: {},
  template: require('./organizations.html'),
  controller: OrganizationsController
};

export default angular.module('app.components.organizations.component', [
]).component('organizations', Organizations).name;
