class NewModalController {
  constructor(
    $scope, $stateParams,
    departmentsDetailTeamsDetailPositionsDetailEntities, departmentsDetailTeamsDetailLeaders,
    positionId
  ) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamsDetailPositionsDetailEntities = departmentsDetailTeamsDetailPositionsDetailEntities;
    this.departmentsDetailTeamsDetailLeaders = departmentsDetailTeamsDetailLeaders;
    this.positionId = positionId;
    this.entity = { person_id: null, leader_ids: [] };
    this.loadLeaders();
  }
  loadLeaders() {
    this.departmentsDetailTeamsDetailLeaders.load(this.$stateParams.teamId).then((leaders) => {
      this.leadersList = angular.copy(leaders);
    });
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
