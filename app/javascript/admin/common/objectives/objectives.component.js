class ObjectivesController {
}

let Objectives = {
  bindings: {
    collection: '<',
    service: '<'
  },
  template: require('./objectives.html'),
  controller: ObjectivesController
};

export default angular.module('app.common.objectives.component', [
]).component('objectives', Objectives).name;
