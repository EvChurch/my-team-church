class NewModalController {
  constructor(
    $scope,
    admins
  ) {
    this.$scope = $scope;
    this.admins = admins;
    this.admin_id = null;
  }
  save() {
    return this.admins.create(this.admin_id).then(() => {
      this.$scope.$hide();
    });
  }
  setAdminId($id) {
    this.admin_id = $id;
  }
}

export default angular.module('app.components.admins.new.controller', [])
  .controller('adminsNewModalController', NewModalController).name;
