class ItemsController {
  constructor(
    $rootScope,
    departmentPositionItems
  ) {
    this.$rootScope = $rootScope;
    this.departmentPositionItems = departmentPositionItems;
    this.sortableOptions = {
      containment: '.departments-detail-positions-detail-items',
      // restrict move across columns. move only within column.
      accept: (sourceItemHandleScope, destSortableScope) =>
          sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id,
      orderChanged: (event) => {
          const index = event.dest.index;
          return this.departmentPositionItems.update(
            this.positionId, this.items[index].id, { name: this.items[index].name, order: index + 1 }
          );
      },
      containerPositioning: 'relative'
    };
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('departmentPositionItemCreate', (_event, positionId) => {
      if (positionId === this.positionId) this.load();
    });
    this.watcher1 = this.$rootScope.$on('departmentPositionItemUpdate', (_event, positionId) => {
      if (positionId === this.positionId) this.load();
    });
    this.watcher2 = this.$rootScope.$on('departmentPositionItemDelete', (_event, positionId) => {
      if (positionId === this.positionId) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.departmentPositionItems.load(this.positionId).then((data) => {
      this.items = angular.copy(data);
    });
  }
}

let Items = {
  bindings: {
    positionId: '<'
  },
  template: require('./items.html'),
  controller: ItemsController
};

export default angular.module('app.components.departments.detail.positions.detail.items.component', [
]).component('departmentsDetailPositionsDetailItems', Items).name;
