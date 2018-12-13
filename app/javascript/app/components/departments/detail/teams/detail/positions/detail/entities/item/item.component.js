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
    entity: '<'
  },
  template: require('./item.html'),
  controller: ItemController
};

export default angular.module('app.components.departments.detail.positions.detail.entities.item.component', [
]).component('departmentsDetailPositionsDetailEntitiesItem', Item).name;