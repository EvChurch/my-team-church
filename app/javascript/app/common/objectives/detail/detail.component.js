class DetailController {
  constructor(
    $rootScope, $state,
    objectives
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.objectives = objectives;
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('objectiveUpdate', (_event, _resourceId, _resourceType, objective) => {
      if (objective.id === this.objective.id) this.objective = objective;
    });
    this.watcher1 = this.$rootScope.$on('keyResultCreate', (_event, objectiveId) => {
      if (objectiveId === this.objective.id) this.updateObjective();
    });
    this.watcher2 = this.$rootScope.$on('keyResultUpdate', (_event, objectiveId) => {
      if (objectiveId === this.objective.id) this.updateObjective();
    });
    this.watcher3 = this.$rootScope.$on('keyResultDelete', (_event, objectiveId) => {
      if (objectiveId === this.objective.id) this.updateObjective();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
    this.watcher3();
  }
  updateObjective() {
    this.objectives.get(
      this.resourceId, this.resourceType, this.objective.id
    ).then((objective) => {
      this.objective = objective;
    });
  }
}

let Detail = {
  bindings: {
    resourceId: '<',
    resourceType: '<',
    objective: '<'
  },
  template: require('./detail.html'),
  controller: DetailController
};

export default angular.module('app.common.objectives.detail.component', [
]).component('objectivesDetail', Detail).name;
