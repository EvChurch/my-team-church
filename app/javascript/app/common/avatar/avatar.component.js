
class AvatarController {
  constructor() {
  }
  $onInit() {
    this.size = this.size || 'md';
  }
}

let Avatar = {
  bindings: {
    source: '<',
    size: '@'
  },
  template: require('./avatar.html'),
  controller: AvatarController
};

export default angular.module('app.common.avatar.component', [
]).component('avatar', Avatar).name;
