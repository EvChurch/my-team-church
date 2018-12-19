class NavbarController {
  constructor(
    user
  ) {
    this.user = user;
  }
}

let Navbar = {
  template: require('./navbar.html'),
  controller: NavbarController
};

export default angular.module('app.common.navbar.component', [
]).component('navbar', Navbar).name;
