class NewModalController {
  constructor(
    $scope,
    departmentLeaders,
    departmentId
  ) {
    this.$scope = $scope;
    this.departmentLeaders = departmentLeaders;
    this.departmentId = departmentId;
    this.departmentLeader = { person_id: null };
  }
  save() {
    return this.departmentLeaders.create(this.departmentId, this.departmentLeader).then(() => {
      this.$scope.$hide();
    });
  }
  setPersonId($id) {
    this.departmentLeader.person_id = $id;
  }
}

export default angular.module('app.components.departments.detail.leaders.new.controller', [])
  .controller('departmentLeadersNewModalController', NewModalController).name;
