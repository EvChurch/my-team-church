class DetailController {
  constructor(
    $stateParams,
    departments
  ) {
    this.$stateParams = $stateParams;
    this.departments = departments;
  }

  $onInit() {
    this.department = this.departments.get(this.$stateParams.id).then((department) => {
      this.data = department;
    });
  }
}

let Detail = {
  bindings: {},
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.components.departments.detail.component', [
]).component('departmentsDetail', Detail).name;
