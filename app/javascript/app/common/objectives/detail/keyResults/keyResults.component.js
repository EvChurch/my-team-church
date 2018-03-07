class KeyResultsController {
  constructor(
    $rootScope, $state,
    keyResults
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.keyResults = keyResults;
  }
  $onInit() {
    this.load();
    this.watcher0 = this.$rootScope.$on('keyResultCreate', (_event, objectiveId) => {
      if (objectiveId === this.objective.id) this.load();
    });
    this.watcher1 = this.$rootScope.$on('keyResultUpdate', (_event, objectiveId) => {
      if (objectiveId === this.objective.id) this.load();
    });
    this.watcher2 = this.$rootScope.$on('keyResultDelete', (_event, objectiveId) => {
      if (objectiveId === this.objective.id) this.load();
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
    this.watcher2();
  }
  load() {
    this.keyResults.load(this.resourceId, this.resourceType, this.objective.id).then((data) => {
      this.list = data;
    });
  }
}

let KeyResults = {
  bindings: {
    resourceId: '<',
    resourceType: '<',
    objective: '<'
  },
  template: require('./keyResults.html'),
  controller: KeyResultsController
};

export default angular.module('app.common.objectives.detail.keyResults.component', [
]).component('objectivesDetailKeyResults', KeyResults).name;
