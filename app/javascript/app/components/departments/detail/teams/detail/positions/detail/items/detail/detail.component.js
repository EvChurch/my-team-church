class DetailController {
  constructor(
    $rootScope, $state, $stateParams,
    departmentsDetailTeamDetailPositionsDetailItems
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamDetailPositionsDetailItems = departmentsDetailTeamDetailPositionsDetailItems;
    this.complete = false;
  }
  save() {
    if (this.item.name !== '') {
      return this.departmentsDetailTeamDetailPositionsDetailItems.update(
        this.$stateParams.positionId, this.item.id, { name: this.item.name }
      ).then((item) => {
        this.item = item;
      });
    }
  }
  delete() {
    return this.departmentsDetailTeamDetailPositionsDetailItems.delete(this.$stateParams.positionId, this.item.id);
  }
}

let Detail = {
  bindings: {
    item: '<',
    readOnly: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.positions.detail.items.detail.component', [
]).component('departmentsDetailPositionsDetailItemsDetail', Detail).name;
