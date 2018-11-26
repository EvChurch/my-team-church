
class AvatarController {
  constructor() {
  }
}

let Avatar = {
  bindings: {
    source: '<'
  },
  template: require('./avatar.html'),
  controller: AvatarController
};

export default angular.module('app.common.avatar.component', [
]).component('avatar', Avatar).name;
