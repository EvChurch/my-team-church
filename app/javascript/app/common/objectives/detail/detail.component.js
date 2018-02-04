class DetailController {
}

let Detail = {
  bindings: {},
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.common.objectives.detail.component', [
]).component('ObjectivesDetail', Detail).name;
