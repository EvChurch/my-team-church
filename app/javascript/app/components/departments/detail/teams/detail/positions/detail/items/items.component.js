class ItemsController {
  constructor(
    $rootScope, $stateParams,
    departmentsDetailTeamDetailPositionsDetailItems
  ) {
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.departmentsDetailTeamDetailPositionsDetailItems = departmentsDetailTeamDetailPositionsDetailItems;
    this.sortableOptions = {
      containment: '.departments-detail-teams-detail-positions-detail-items',
      accept: (sourceItemHandleScope, destSortableScope) =>
          sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id,
      orderChanged: (event) => {
          const index = event.dest.index;
          return this.departmentsDetailTeamDetailPositionsDetailItems.update(
            this.$stateParams.positionId, this.items[index].id, { name: this.items[index].name, order: index + 1 }
          );
      },
      containerPositioning: 'relative'
    };
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('itemCreate', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('itemUpdate', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('itemDelete', (_event, positionId) => {
      if (positionId === this.$stateParams.positionId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.loading = true;
    this.departmentsDetailTeamDetailPositionsDetailItems.load(this.$stateParams.positionId).then(
      (items) => {
        this.loading = false;
        this.items = angular.copy(items);
      }
    );
  }
}

let Items = {
  bindings: {
    readOnly: '<'
  },
  template: require('./items.html'),
  controller: ItemsController
};

export default angular.module('app.components.departments.detail.teams.detail.positions.detail.items.component', [
]).component('departmentsDetailTeamsDetailPositionsDetailItems', Items).name;
