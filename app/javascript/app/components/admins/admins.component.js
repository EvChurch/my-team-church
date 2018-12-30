class AdminsController {
  constructor(
    $rootScope, $stateParams,
    admins
  ) {
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.admins = admins;

    this.list = [];
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('adminCreate', (_event) => {
      this.load();
    });
    this.watcher1 = this.$rootScope.$on('adminDelete', (_event) => {
      this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  load() {
    this.loading = true;
    this.admins.load().then((admins) => {
      this.loading = false;
      this.list = angular.copy(admins);
    });
  }
}

let Admins = {
  template: require('./admins.html'),
  controller: AdminsController
};

export default angular.module('app.components.admins.component', [
]).component('admins', Admins).name;
