class NewController {
  constructor(
    $rootScope, $state,
    departmentPositionItems
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.departmentPositionItems = departmentPositionItems;
    this.item = {
      name: '',
    };
  }
  save() {
    if (this.item.name !== '') {
      return this.departmentPositionItems.create(this.positionId, this.item).then(() => {
        this.item.name = '';
      });
    }
  }
}

let New = {
  bindings: {
    positionId: '<'
  },
  template: require('./new.html'),
  controller: NewController
};

export default angular.module('app.components.departments.detail.positions.detail.items.new.component', [
]).component('departmentsDetailPositionsDetailItemsNew', New).name;
