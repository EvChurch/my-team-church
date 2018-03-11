class EditModalController {
  constructor(
    $scope,
    positions,
    departmentId, position
  ) {
    this.$scope = $scope;
    this.positions = positions;
    this.departmentId = departmentId;
    this.id = position.id;
    this.position = {
      name: position.name,
      description: position.description
    };
  }
  save() {
    return this.positions.update(this.departmentId, this.id, this.position).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.positions.delete(this.departmentId, this.id).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.components.departments.detail.positions.edit.controller', [])
  .controller('positionsEditModalController', EditModalController).name;
