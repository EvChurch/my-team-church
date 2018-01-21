class PositionsController {
}

let Positions = {
  bindings: {
    positions: '<'
  },
  template: require('./positions.html'),
  controller: PositionsController
};

export default angular.module('app.components.departments.detail.positions.component', [
]).component('departmentsDetailPositions', Positions).name;
