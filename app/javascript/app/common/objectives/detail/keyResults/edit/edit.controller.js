class EditModalController {
  constructor(
    $scope,
    keyResults,
    resourceId, resourceType, objective, keyResult
  ) {
    this.$scope = $scope;
    this.keyResults = keyResults;
    this.resourceId = resourceId;
    this.resourceType = resourceType;
    this.objective = objective;
    this.id = keyResult.id;
    this.keyResult = {
      name: keyResult.name,
      result_type: keyResult.result_type,
      start_value: keyResult.start_value,
      target_value: keyResult.target_value,
      current_value: keyResult.current_value,
      weight: keyResult.weight
    };
  }
  save() {
    return this.keyResults.update(
      this.resourceId, this.resourceType, this.objective.id, this.id, this.keyResult
    ).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.keyResults.delete(
      this.resourceId, this.resourceType, this.objective.id, this.id
    ).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.common.objectives.detail.keyResults.edit.controller', [])
  .controller('objectivesDetailKeyResultsEditModalController', EditModalController).name;
