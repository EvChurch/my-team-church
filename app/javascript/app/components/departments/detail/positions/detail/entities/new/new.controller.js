class NewModalController {
  constructor(
    $scope,
    departmentPositionEntities,
    positionId
  ) {
    this.$scope = $scope;
    this.positionEntities = departmentPositionEntities;
    this.positionId = positionId;
    this.positionEntity = { person_id: null };
  }
  save() {
    return this.positionEntities.create(this.positionId, this.positionEntity).then(() => {
      this.$scope.$hide();
    });
  }
  setPersonId($id) {
    this.positionEntity.person_id = $id;
  }
}

export default angular.module('app.components.departments.detail.positions.detail.entities.new.controller', [])
  .controller('departmentPositionEntitiesNewModalController', NewModalController).name;
