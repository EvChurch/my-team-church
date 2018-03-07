class EditModalController {
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
    return this.objectives.update(this.resourceId, this.resourceType, this.id, this.objective).then(() => {
      this.$scope.$hide();
    });
  }
  delete() {
    return this.objectives.delete(this.resourceId, this.resourceType, this.id).then(() => {
      this.$scope.$hide();
    });
  }
}

export default angular.module('app.common.objectives.edit.controller', [])
  .controller('objectivesEditModalController', EditModalController).name;
