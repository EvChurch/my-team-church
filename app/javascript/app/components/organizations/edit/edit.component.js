class EditController {
  constructor(organizations) {
    this.organizations = organizations;
  }
}

let Edit = {
  bindings: {},
  template: require('./edit.html'),
  controller: EditController
};

export default angular.module('app.components.organizations.edit.component', [
]).component('organizationsEdit', Edit).name;
