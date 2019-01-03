class NewModalController {
  constructor(
    $scope,
    departmentsDetailTeamsDetailLeaders,
    teamId
  ) {
    this.$scope = $scope;
    this.departmentsDetailTeamsDetailLeaders = departmentsDetailTeamsDetailLeaders;
    this.teamId = teamId;
    this.leader = { person_id: null };
  }
  save() {
    return this.departmentsDetailTeamsDetailLeaders.create(this.teamId, this.leader).then(() => {
      this.$scope.$hide();
    });
  }
  setPersonId($id) {
    this.leader.person_id = $id;
  }
}

export default angular.module('app.components.departments.detail.leaders.new.controller', [])
  .controller('departmentsDetailTeamsDetailLeadersNewModalController', NewModalController).name;
