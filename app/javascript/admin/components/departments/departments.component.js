class DepartmentsController {
  constructor(departments) {
    this.departments = departments;
  }
}

let Departments = {
  bindings: {},
  template: require('./departments.html'),
  controller: DepartmentsController
};

export default angular.module('app.components.departments.component', [
]).component('departments', Departments).name;
