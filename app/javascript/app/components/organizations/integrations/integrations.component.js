class IntegrationsController {
  constructor(
    $rootScope,
    organizationsIntegrations
  ) {
    this.$rootScope = $rootScope;
    this.organizationsIntegrations = organizationsIntegrations;
  }
  $onInit() {
    this.watcher0 = this.$rootScope.$on('integrationCreate', () => this.load());
    this.watcher1 = this.$rootScope.$on('integrationDelete', () => this.load());

    this.load();
  }
  $onDestroy() {
    this.watcher0();
    this.watcher1();
  }
  load() {
    this.loading = true;
    return this.organizationsIntegrations.load().then((integrations) => {
      this.loading = false;
      this.list = angular.copy(integrations);
    });
  }
}

let Integrations = {
  template: require('./integrations.html'),
  controller: IntegrationsController
};

export default angular.module('app.components.organizations.integrations.component', [
]).component('organizationsIntegrations', Integrations).name;
