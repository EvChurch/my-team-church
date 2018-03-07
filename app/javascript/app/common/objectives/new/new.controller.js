class NewModalController {
  constructor(
    $scope,
    objectives,
    resourceId, resourceType
  ) {
    this.$scope = $scope;
    this.objectives = objectives;
    this.resourceId = resourceId;
    this.resourceType = resourceType;
    this.objective = { name: '', description: '' };
  }
  save() {
    return this.objectives.create(this.resourceId, this.resourceType, this.objective).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.common.objectives.new.controller', [])
  .controller('objectivesNewModalController', NewModalController).name;
