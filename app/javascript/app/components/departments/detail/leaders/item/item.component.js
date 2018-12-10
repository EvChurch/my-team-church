import { reject } from 'lodash/fp';

class ItemController {
  constructor(
      $rootScope
  ) {
      this.$rootScope = $rootScope;
  }
}

let Item = {
  bindings: {
    leader: '<'
  },
  template: require('./item.html'),
  controller: ItemController
};

export default angular.module('app.components.departments.detail.leaders.item.component', [
]).component('departmentsDetailLeadersItem', Item).name;
