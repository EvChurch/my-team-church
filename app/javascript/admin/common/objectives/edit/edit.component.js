class EditController {
}

let Edit = {
  bindings: {
    collection: '<',
    service: '<'
  },
  template: require('./edit.html'),
  controller: EditController
};

export default angular.module('app.common.objectives.edit.component', [
]).component('objectivesEdit', Edit).name;
