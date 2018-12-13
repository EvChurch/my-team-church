class KeyResultsController {
  constructor(
    $rootScope, $state,
    objectivesDetailsKeyResults
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.objectivesDetailsKeyResults = objectivesDetailsKeyResults;
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
    this.loading = true;
    this.objectivesDetailsKeyResults.load(this.resourceId, this.resourceType, this.objective.id).then((keyResults) => {
      this.loading = false;
      this.list = angular.copy(keyResults);
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
