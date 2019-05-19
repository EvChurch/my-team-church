class EditModalController {
  constructor(
    $scope,
    departmentsDetailTeams, modal,
    departmentId, team
  ) {
    this.$scope = $scope;
    this.departmentsDetailTeams = departmentsDetailTeams;
    this.departmentId = departmentId;
    this.modal = modal;
    this.id = team.id;
    this.team = {
      name: team.name
    };
  }
  save() {
    return this.departmentsDetailTeams.update(this.departmentId, this.id, this.team).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.modal.delete(this.team.name, 'team').then(() => {
        return this.departmentsDetailTeams.delete(this.departmentId, this.id).then(() => {
        this.$scope.$hide();
      });
    });
  }
}

export default angular.module('app.components.departments.detail.teams.edit.controller', [])
  .controller('departmentsDetailTeamsEditModalController', EditModalController).name;
