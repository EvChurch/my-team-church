class RootController {
  constructor(
    $rootScope,
    $state, $stateParams,
    api
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.api = api;
    this.loading = false;
    this.authenticated = false;
  }

  $onInit() {
    this.loading = true;
    this.api.authenticate().then(() => {
      this.loading = false;
      this.authenticated = true;
      this.$rootScope.$digest();
    }).catch(() => {
      this.$state.go('login');
    });
  }
}

let Root = {
  bindings: {},
  template: require('./root.html'),
  controller: RootController
};

import api from '../../common/api/api.service';

export default angular.module('app.components.root.component', [
  api
]).component('root', Root).name;
