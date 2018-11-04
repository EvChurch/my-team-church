class ConnectController {
  constructor(
    $state, $stateParams,
    organizations
  ) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.organizations = organizations;
    if ($stateParams.access_code) {
      this.accessCode = $stateParams.access_code;
      this.submit();
    }
  }
  submit() {
    this.loading = true;
    this.organizations.connect(this.accessCode).then(() => {
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
