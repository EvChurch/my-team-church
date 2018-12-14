class ItemController {
}

let Item = {
  bindings: {
    entity: '<'
  },
  template: require('./item.html'),
  controller: ItemController
};

export default angular.module(
  'app.components.departments.detail.teams.detail.positions.detail.entities.item.component', []
).component('departmentsDetailTeamsDetailPositionsDetailEntitiesItem', Item).name;
