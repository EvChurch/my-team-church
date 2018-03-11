class NewModalController {
  constructor(
    $scope,
    departmentPositions,
    departmentId
  ) {
    this.$scope = $scope;
    this.departmentPositions = departmentPositions;
    this.departmentId = departmentId;
    this.position = { name: '', description: '' };
  }
  save() {
    return this.departmentPositions.create(this.departmentId, this.position).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.common.departmentPositions.new.controller', [])
  .controller('positionsNewModalController', NewModalController).name;
