class SidebarController {
  constructor(
    $state,
    user
  ) {
    this.$state = $state;
    this.user = user;
  }
  signOut() {
    this.user.signOut().then(() => {
      this.$state.go('signIn');
    });
  }
}

let Sidebar = {
  bindings: {},
  template: require('./sidebar.html'),
  controller: SidebarController
};

export default angular.module('app.common.sidebar.component', [
]).component('sidebar', Sidebar).name;
