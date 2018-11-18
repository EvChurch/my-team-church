import gql from 'graphql-tag';
import { reduce } from 'lodash/fp';

class IntegrationsController {
  constructor(
    $state, toastr,
    api
  ) {
    this.$state = $state;
    this.api = api;
    this.toastr = toastr;
    this.elvanto = { type: 'Integration::Elvanto' };
    this.errors = {};
  }
  elvantoSubmit() {
    this.loading = true;
    return this.api.mutate(gql`
      mutation createOrUpdateIntegration($integration: IntegrationInputType!) {
        createOrUpdateIntegration(
          integration: $integration
        ) {
          id
        }
      }
    `, { integration: this.elvanto }).then(() => {
      this.toastr.success('Syncing will occur in the background.', 'Your integration was saved successfully.');
      this.loading = false;
      this.$state.go('home');
    }).catch((error) => {
      this.toastr.error('Please review your submission and try again!', 'Error saving your integration');
      this.errors = reduce((result, error) => {
        if(error.path.length > 1) {
          result[error.path.pop()] = error.message;
        }
        return result;
      }, {}, error.graphQLErrors);
      this.loading = false;
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
