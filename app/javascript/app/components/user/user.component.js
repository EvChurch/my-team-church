class UserController {
  constructor(
    $state,
    user
  ) {
    this.$state = $state;
    this.user = user;
  }
  $onInit() {
    this.user.load(true).then((data) => {
      this.userCopy = angular.copy(data);
    });
  }
  save() {
    this.user.updateUser(this.userCopy).then((data) => {
      this.$state.go('points');
    });
  }
}

let User = {
  bindings: {},
  template: require('./user.html'),
  controller: UserController
};

import user from './user.service';

export default angular.module('app.components.user.component', [
  user
]).component('user', User).name;
