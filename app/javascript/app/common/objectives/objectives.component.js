class ObjectivesController {
  constructor(
    objectives
  ) {
    this.objectives = objectives;
  }
  $onInit() {
    this.objectives.load(this.resourceId, this.resourceType).then((data) => {
      this.list = data;
    });
  }
}

let Objectives = {
  bindings: {
    resourceType: '<',
    resourceId: '<'
  },
  template: require('./objectives.html'),
  controller: ObjectivesController
};

export default angular.module('app.common.objectives.component', [
]).component('objectives', Objectives).name;
