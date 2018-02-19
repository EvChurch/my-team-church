class ConnectController {
  constructor(organizations) {
    this.organizations = organizations;
  }
}

let Connect = {
  bindings: {},
  template: require('./connect.html'),
  controller: ConnectController
};

export default angular.module('app.components.organizations.connect.component', [
]).component('organizationsConnect', Connect).name;
