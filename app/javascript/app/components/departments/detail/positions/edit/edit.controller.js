class EditModalController {
  constructor(
    $scope,
    departmentPositions,
    departmentId, position
  ) {
    this.$scope = $scope;
    this.departmentPositions = departmentPositions;
    this.departmentId = departmentId;
    this.id = position.id;
    this.position = {
      name: position.name,
      people_needed: position.people_needed
    };
  }
  save() {
    return this.departmentPositions.update(this.departmentId, this.id, this.position).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.departmentPositions.delete(this.departmentId, this.id).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.components.departments.detail.departmentPositions.edit.controller', [])
  .controller('positionsEditModalController', EditModalController).name;
