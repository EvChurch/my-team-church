class NewController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentsDetailTeamDetailPositionsDetailItems
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamDetailPositionsDetailItems = departmentsDetailTeamDetailPositionsDetailItems;
    this.item = {
      name: '',
    };
  }
  save() {
    if (this.item.name !== '') {
      return this.departmentsDetailTeamDetailPositionsDetailItems.create(this.$stateParams.positionId, this.item).then(
        () => {
          this.item.name = '';
        }
      );
    }
  }
}

let New = {
  template: require('./new.html'),
  controller: NewController
};

export default angular.module('app.components.departments.detail.positions.detail.items.new.component', [
]).component('departmentsDetailPositionsDetailItemsNew', New).name;
