class SidebarController {
  constructor(
    $state, toastr,
    user
  ) {
    this.$state = $state;
    this.toastr = toastr;
    this.user = user;
  }
  signOut() {
    this.user.signOut().then(() => {
      this.$state.go('signIn');
      this.toastr.success('Successfully Signed Out');
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
