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
  searchValueMatches() {
    return this.searchValue !== '' && this.item.name.toLowerCase().includes(this.searchValue.toLowerCase());
  }
}

let Item = {
  bindings: {
    item: '<',
    level: '<',
    searchValue: '<'
  },
  template: require('./item.html'),
  controller: ItemController
};

export default angular.module('app.components.departments.list.item.component', [
]).component('departmentsListItem', Item).name;
