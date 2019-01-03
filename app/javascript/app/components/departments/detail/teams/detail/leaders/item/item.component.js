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

export default angular.module('app.components.departments.detail.teams.detail.leaders.item.component', [
]).component('departmentsDetailTeamsDetailLeadersItem', Item).name;
