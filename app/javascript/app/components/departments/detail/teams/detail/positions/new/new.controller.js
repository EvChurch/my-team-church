class NewModalController {
  constructor(
    $scope,
    departmentsDetailTeamsDetailPositions,
    teamId
  ) {
    this.$scope = $scope;
    this.departmentsDetailTeamsDetailPositions = departmentsDetailTeamsDetailPositions;
    this.teamId = teamId;
    this.position = { name: '', people_needed: 0 };
  }
  save() {
    return this.departmentsDetailTeamsDetailPositions.create(this.teamId, this.position).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.components.departments.detail.teams.detail.positions.new.controller', [])
  .controller('departmentTeamPositionsNewModalController', NewModalController).name;
