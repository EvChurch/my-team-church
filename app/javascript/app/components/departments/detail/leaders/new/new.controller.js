class NewModalController {
  constructor(
    $scope,
    departmentsDetailLeaders,
    departmentId
  ) {
    this.$scope = $scope;
    this.departmentsDetailLeaders = departmentsDetailLeaders;
    this.departmentId = departmentId;
    this.leader = { person_id: null };
  }
  save() {
    return this.departmentsDetailLeaders.create(this.departmentId, this.leader).then(() => {
      this.$scope.$hide();
    });
  }
  setPersonId($id) {
    this.leader.person_id = $id;
  }
}

export default angular.module('app.components.departments.detail.leaders.new.controller', [])
  .controller('departmentsDetailLeadersNewModalController', NewModalController).name;
