class ObjectivesEditModalController {
  constructor(
    $scope,
    objectives,
    resourceId, resourceType, objective
  ) {
    this.$scope = $scope;
    this.objectives = objectives;
    this.resourceId = resourceId;
    this.resourceType = resourceType;
    this.id = objective.id;
    this.objective = {
      name: objective.name,
      description: objective.description
    };
  }
  save() {
    return this.service.update(this.resourceId, this.resourceType, this.id, this.objective).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.service.delete(this.resourceId, this.resourceType, this.id).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.common.objectives.edit.controller', [])
  .controller('objectivesEditModalController', ObjectivesEditModalController).name;
