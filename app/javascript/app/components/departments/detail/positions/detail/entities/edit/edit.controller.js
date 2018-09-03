class EditModalController {
  constructor(
    $scope,
    departmentPositionEntities,
    positionId,
    id,
    positionEntity
  ) {
    this.$scope = $scope;
    this.positionEntities = departmentPositionEntities;
    this.positionId = positionId;
    this.id = id;
    this.positionEntity = positionEntity;
  }
  save() {
    return this.positionEntities.update(this.positionId, this.id, {
      start_at: this.positionEntity.start_at,
      end_at: this.positionEntity.end_at,
      trial: this.positionEntity.trial
    }).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.components.departments.detail.positions.detail.entities.edit.controller', [])
  .controller('departmentPositionEntitiesEditModalController', EditModalController).name;
