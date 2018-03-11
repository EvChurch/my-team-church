class ObjectivesController {
  constructor(
    $rootScope,
    objectives
  ) {
    this.$rootScope = $rootScope;
    this.objectives = objectives;
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('objectiveCreate', (_event, resourceId, resourceType) => {
      if (resourceId === this.resourceId && resourceType === this.resourceType) this.load();
    });
    this.watcher1 = this.$rootScope.$on('objectiveUpdate', (_event, resourceId, resourceType) => {
      if (resourceId === this.resourceId && resourceType === this.resourceType) this.load();
    });
    this.watcher2 = this.$rootScope.$on('objectiveDelete', (_event, resourceId, resourceType) => {
      if (resourceId === this.resourceId && resourceType === this.resourceType) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.objectives.load(this.resourceId, this.resourceType).then((data) => {
      this.list = angular.copy(data);
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
