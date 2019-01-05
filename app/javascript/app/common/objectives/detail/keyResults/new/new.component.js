class NewController {
  constructor(
    $rootScope, $state,
    objectivesDetailsKeyResults
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.objectivesDetailsKeyResults = objectivesDetailsKeyResults;
    this.keyResult = {
      name: '',
      result_type: '%',
      start_value: 0,
      target_value: 100,
      current_value: 0,
      weight: 1,
      kind: 'key_result'
    };
  }
  save() {
    return this.objectivesDetailsKeyResults.create(
      this.resourceId, this.resourceType, this.objective.id, this.keyResult
    ).then(() => {
      this.keyResult.name = '';
    });
  }
}

let New = {
  bindings: {
    resourceId: '<',
    resourceType: '<',
    objective: '<'
  },
  template: require('./new.html'),
  controller: NewController
};

export default angular.module('app.common.objectives.detail.keyResults.new.component', [
]).component('objectivesDetailKeyResultsNew', New).name;
