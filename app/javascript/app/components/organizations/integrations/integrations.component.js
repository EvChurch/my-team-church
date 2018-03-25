import gql from 'graphql-tag';

class IntegrationsController {
  constructor(
    $state,
    api
  ) {
    this.$state = $state;
    this.api = api;
    this.elvanto = { type: 'Integration::Elvanto' };
  }
  elvantoSubmit() {
    this.loading = true;
    return this.api.mutate(gql`
      mutation createOrUpdateIntegration($integration: IntegrationInputType!) {
        createOrUpdateIntegration(
          integration: $integration
        ) {
          id
          client_id
          client_secret
          api_key
        }
      }
    `, { integration: this.elvanto }).then(() => {
      this.loading = false;
      this.$state.go('home');
    });
  }
}

let Integrations = {
  bindings: {
    organization: '<'
  },
  template: require('./integrations.html'),
  controller: IntegrationsController
};

export default angular.module('app.components.organizations.integrations.component', [
]).component('organizationsIntegrations', Integrations).name;
