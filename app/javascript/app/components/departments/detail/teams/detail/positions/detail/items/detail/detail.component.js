class DetailController {
  constructor(
    $rootScope, $state,
    departmentPositionItems
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departmentPositionItems = departmentPositionItems;
    this.complete = false;
  }
  save() {
    if (this.positionItem.name !== '') {
      return this.departmentPositionItems.update(
        this.positionId, this.positionItem.id, { name: this.positionItem.name }
      ).then((positionItem) => {
        this.positionItem = positionItem;
      });
    }
  }
  delete() {
    return this.departmentPositionItems.delete(this.positionId, this.positionItem.id);
  }
}

let Detail = {
  bindings: {
    positionId: '<',
    positionItem: '<',
    readOnly: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.positions.detail.items.detail.component', [
]).component('departmentsDetailPositionsDetailItemsDetail', Detail).name;
