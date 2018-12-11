
class JobDescriptionController {
  constructor(
    departmentPositions
  ) {
    this.departmentPositions = departmentPositions;
  }
  $onInit() {
    this.id = this.position.id;
    this.position = { description: this.position.description };
  }
  save() {
    if (!this.readOnly) {
      return this.departmentPositions.update(this.departmentId, this.id, this.position);
    }
  }
}

let JobDescription = {
  bindings: {
    departmentId: '<',
    position: '<',
    readOnly: '<'
  },
  template: require('./jobDescription.html'),
  controller: JobDescriptionController
};

export default angular.module('app.components.departments.detail.positions.detail.jobDescription.component', [
]).component('departmentsDetailPositionsDetailJobDescription', JobDescription).name;
