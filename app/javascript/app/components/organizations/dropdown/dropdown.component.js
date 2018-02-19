class DropdownController {
  constructor(organizations) {
    this.organizations = organizations;
  }
}

let Dropdown = {
  bindings: {},
  template: require('./dropdown.html'),
  controller: DropdownController
};

export default angular.module('app.components.organizations.dropdown.component', [
]).component('organizationsDropdown', Dropdown).name;
