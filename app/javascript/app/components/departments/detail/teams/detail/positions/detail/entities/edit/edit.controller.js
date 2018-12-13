class EditModalController {
  constructor(
    $scope,
    departmentsDetailTeamsDetailPositionsDetailEntities,
    positionId,
    entity
  ) {
    this.$scope = $scope;
    this.departmentsDetailTeamsDetailPositionsDetailEntities = departmentsDetailTeamsDetailPositionsDetailEntities;
    this.positionId = positionId;
    this.entity = entity;
  }
  save() {
    return this.departmentsDetailTeamsDetailPositionsDetailEntities.update(this.positionId, this.entity.id, {
      start_at: this.entity.start_at,
      end_at: this.entity.end_at,
      trial: this.entity.trial
    }).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module(
  'app.components.departments.detail.teams.detail.positions.detail.entities.edit.controller', []
).controller('departmentsDetailTeamsDetailPositionsDetailEntitiesEditModalController', EditModalController).name;
