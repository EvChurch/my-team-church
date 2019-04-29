class EditModalController {
  constructor(
    $scope,
    departmentsDetailTeamsDetailPositions, modal,
    teamId, position
  ) {
    this.$scope = $scope;
    this.departmentsDetailTeamsDetailPositions = departmentsDetailTeamsDetailPositions;
    this.modal = modal;
    this.teamId = teamId;
    this.id = position.id;
    this.position = {
      name: position.name,
      people_needed: position.people_needed
    };
  }
  save() {
    return this.departmentsDetailTeamsDetailPositions.update(this.teamId, this.id, this.position).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.modal.delete(this.position.name, 'position').then(() => {
      return this.departmentsDetailTeamsDetailPositions.delete(this.teamId, this.id).then(() => {
        this.$scope.$hide();
      });
    });
  }
}

export default angular.module('app.components.departments.detail.teams.detail.positions.edit.controller', [])
  .controller('departmentTeamPositionsEditModalController', EditModalController).name;
