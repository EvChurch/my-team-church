class NewModalController {
  constructor(
    $scope,
    departmentsDetailTeamsDetailPositionsDetailEntities,
    positionId
  ) {
    this.$scope = $scope;
    this.departmentsDetailTeamsDetailPositionsDetailEntities = departmentsDetailTeamsDetailPositionsDetailEntities;
    this.positionId = positionId;
    this.entity = { person_id: null };
  }
  save() {
    return this.departmentsDetailTeamsDetailPositionsDetailEntities.create(this.positionId, this.entity).then(
      () => {
        this.$scope.$hide();
      }
    );
  }
  setPersonId(id) {
    this.entity.person_id = id;
  }
}

export default angular.module(
  'app.components.departments.detail.teams.detail.positions.detail.entities.new.controller', []
).controller('departmentsDetailTeamsDetailPositionsDetailEntitiesNewModalController', NewModalController).name;
