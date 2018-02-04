class ItemController {
  constructor($state) {
    this.$state = $state;
  }
  currentState() {
    return this.$state.includes('departments.detail', { id: this.item.id });
  }
  getNumber(num) {
    return new Array(num);
  }
}

let Item = {
  bindings: {
    item: '<',
    level: '<'
  },
  template: require('./item.html'),
  controller: ItemController
};

export default angular.module('app.components.departments.list.item.component', [
]).component('departmentsListItem', Item).name;
