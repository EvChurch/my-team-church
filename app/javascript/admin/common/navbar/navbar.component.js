class NavbarController {
  constructor(
    $state,
    api
  ) {
    this.$state = $state;
    this.api = api;
  }

  logout() {
    console.log('test');
    this.api.logout().then(() => {
      this.$state.go('login');
    });
  }
}

let Navbar = {
  bindings: {},
  template: require('./navbar.html'),
  controller: NavbarController
};

export default angular.module('app.common.navbar.component', [
]).component('navbar', Navbar).name;
