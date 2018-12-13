class NewModalController {
  constructor(
    $scope,
    departmentsDetailTeams,
    departmentId
  ) {
    this.$scope = $scope;
    this.departmentsDetailTeams = departmentsDetailTeams;
    this.departmentId = departmentId;
    this.team = { name: '' };
  }
  save() {
    return this.departmentsDetailTeams.create(this.departmentId, this.team).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.components.departments.detail.teams.new.controller', [])
  .controller('departmentsDetailTeamsNewModalController', NewModalController).name;
