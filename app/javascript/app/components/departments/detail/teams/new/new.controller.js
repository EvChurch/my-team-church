class NewModalController {
  constructor(
    $scope,
    departmentDetailTeams,
    departmentId
  ) {
    this.$scope = $scope;
    this.departmentDetailTeams = departmentDetailTeams;
    this.departmentId = departmentId;
    this.team = { name: '' };
  }
  save() {
    return this.departmentDetailTeams.create(this.departmentId, this.team).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.components.departments.detail.teams.new.controller', [])
  .controller('departmentDetailTeamsNewModalController', NewModalController).name;
