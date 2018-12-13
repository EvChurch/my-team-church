class EditModalController {
  constructor(
    $scope,
    objectivesDetailsKeyResults,
    resourceId, resourceType, objective, id, keyResult
  ) {
    this.$scope = $scope;
    this.objectivesDetailsKeyResults = objectivesDetailsKeyResults;
    this.resourceId = resourceId;
    this.resourceType = resourceType;
    this.objective = objective;
    this.id = id;
    this.keyResult = angular.copy(keyResult);
  }
  save() {
    return this.objectivesDetailsKeyResults.update(
      this.resourceId, this.resourceType, this.objective.id, this.id, this.keyResult
    ).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.objectivesDetailsKeyResults.delete(
      this.resourceId, this.resourceType, this.objective.id, this.id
    ).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.common.objectives.detail.keyResults.edit.controller', [])
  .controller('objectivesDetailKeyResultsEditModalController', EditModalController).name;
