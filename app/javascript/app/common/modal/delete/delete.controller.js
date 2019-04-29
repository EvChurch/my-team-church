class DeleteController {
  constructor(
    $scope,
    deletePromise, name, type
  ) {
    this.$scope = $scope;
    this.deletePromise = deletePromise;
    this.name = name;
    this.type = type;
  }
  no() {
    this.deletePromise.reject();
    this.$scope.$hide();
    return this.deletePromise.promise;
  }
  yes() {
    this.deletePromise.resolve();
    this.$scope.$hide();
    return this.deletePromise.promise;
  }
}

export default angular.module('app.common.modal.delete.controller', [])
  .controller('deleteController', DeleteController).name;
