class DropdownController {
  constructor(
    $rootScope,
    organizations
  ) {
    this.$rootScope = $rootScope;
    this.organizations = organizations;
    this.show = false;
  }
  $onInit() {
    this.watcher = this.$rootScope.$on('root:click', () => {
      if (this.ignoreWatcher) {
        this.ignoreWatcher = false;
      } else {
        this.show = false;
      }
    });
  }
  toggle() {
    this.show = !this.show;
    this.ignoreWatcher = true;
  }
}

let Dropdown = {
  bindings: {},
  template: require('./dropdown.html'),
  controller: DropdownController
};

export default angular.module('app.components.organizations.dropdown.component', [
]).component('organizationsDropdown', Dropdown).name;
