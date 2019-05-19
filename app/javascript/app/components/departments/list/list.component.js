class ListController {
}

let List = {
  bindings: {
    list: '<',
    level: '<',
    searchValue: '<'
  },
  template: require('./list.html'),
  controller: ListController
};

export default angular.module('app.components.departments.list.component', [
]).component('departmentsList', List).name;
