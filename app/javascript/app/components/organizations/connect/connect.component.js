class ConnectController {
  constructor(
    $state,
    organizations
  ) {
    this.$state = $state;
    this.organizations = organizations;
  }
  submit() {
    this.loading = true;
    this.organizations.connect(this.personId).then(() => {
      this.loading = false;
      this.$state.go('me');
    });
  }
}

let Connect = {
  bindings: {},
  template: require('./connect.html'),
  controller: ConnectController
};

export default angular.module('app.components.organizations.connect.component', [
]).component('organizationsConnect', Connect).name;
