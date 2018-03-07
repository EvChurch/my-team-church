class ItemController {
  constructor(
    $rootScope, $state,
    keyResults
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.keyResults = keyResults;
  }
  $onInit() {
    this.id = this.keyResult.id;
    this.keyResult = {
      name: this.keyResult.name,
      result_type: this.keyResult.result_type,
      start_value: this.keyResult.start_value,
      target_value: this.keyResult.target_value,
      current_value: this.keyResult.current_value,
      weight: this.keyResult.weight
    };
  }
  save() {
    return this.keyResults.update(
      this.resourceId, this.resourceType, this.objective.id, this.id, this.keyResult
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
