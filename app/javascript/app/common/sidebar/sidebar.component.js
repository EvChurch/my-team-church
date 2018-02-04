class SidebarController {
  constructor(
    user
  ) {
    this.user = user;
  }
}

let Sidebar = {
  bindings: {},
  template: require('./sidebar.html'),
  controller: SidebarController
};

export default angular.module('app.common.sidebar.component', [
]).component('sidebar', Sidebar).name;
