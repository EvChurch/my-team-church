class AuthController {
}

let Auth = {
  bindings: {},
  template: require('./auth.html'),
  controller: AuthController
};


export default angular.module('app.components.auth.component', [
]).component('auth', Auth).name;
