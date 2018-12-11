
class TrainingController {
  constructor(
    departmentPositions
  ) {
    this.departmentPositions = departmentPositions;
  }
  $onInit() {
    this.id = this.position.id;
    this.position = { training_description: this.position.training_description || 'No Training Required' };
  }
  save() {
    if (!this.readOnly) {
      return this.departmentPositions.update(this.departmentId, this.id, this.position);
    }
  }
}

let Training = {
  bindings: {
    departmentId: '<',
    position: '<',
    readOnly: '<'
  },
  template: require('./training.html'),
  controller: TrainingController
};

export default angular.module('app.components.departments.detail.positions.detail.training.component', [
]).component('departmentsDetailPositionsDetailTraining', Training).name;
