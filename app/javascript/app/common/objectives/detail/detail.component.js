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
    this.watcher1 = this.$rootScope.$on('objectiveDelete', (_event, _resourceId, _resourceType, objective) => {
      if (objective.id === this.objective.id) this.$state.go('^');
    });
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
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
