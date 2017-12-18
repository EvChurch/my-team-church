class HomeController {
  constructor(
    $state,
    user
  ) {
    this.$state = $state;
    this.user = user;

    this.loading = false;
  }
  $onInit() {
    this.loading = true;
    this.user.load(true).then((user) => {
      this.loading = false;
      if(user.point) {
        this.$state.go('points');
      } else {
        this.$state.go('user');
      };
    });
  }
}

let Home = {
  bindings: {},
  template: require('./home.html'),
  controller: HomeController
};

import user from '../user/user.service';

export default angular.module('app.components.home.component', [
  user
]).component('home', Home).name;
