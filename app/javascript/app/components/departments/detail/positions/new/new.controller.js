class NewModalController {
  constructor(
    $scope,
    positions,
    departmentId
  ) {
    this.$scope = $scope;
    this.positions = positions;
    this.departmentId = departmentId;
    this.position = { name: '', description: '' };
  }
  save() {
    return this.positions.create(this.departmentId, this.position).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.common.positions.new.controller', [])
  .controller('positionsNewModalController', NewModalController).name;
