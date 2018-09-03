class ItemController {
  constructor(
    $rootScope, $state,
    keyResults
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.keyResults = keyResults;
  }
  $onChanges(changesObject) {
    if (changesObject.keyResult) {
      this.id = changesObject.keyResult.currentValue.id;
      this.changedKeyResult = {
        name: changesObject.keyResult.currentValue.name,
        result_type: changesObject.keyResult.currentValue.result_type,
        start_value: changesObject.keyResult.currentValue.start_value,
        target_value: changesObject.keyResult.currentValue.target_value,
        current_value: changesObject.keyResult.currentValue.current_value,
        start_at: changesObject.keyResult.currentValue.start_at,
        end_at: changesObject.keyResult.currentValue.end_at,
        weight: changesObject.keyResult.currentValue.weight
      };
    }
  }
  openEditModal() {
    this.keyResults.openEditKeyResultModal(
      this.resourceId,
      this.resourceType,
      this.objective,
      this.id,
      this.changedKeyResult
    );
  }
  save() {
    return this.keyResults.update(
      this.resourceId, this.resourceType, this.objective.id, this.id, this.changedKeyResult
    );
  }
}

let Item = {
  bindings: {
    resourceId: '<',
    resourceType: '<',
    objective: '<',
    keyResult: '<'
  },
  template: require('./item.html'),
  controller: ItemController
};

export default angular.module('app.common.objectives.detail.keyResults.item.component', [
]).component('objectivesDetailKeyResultsItem', Item).name;
