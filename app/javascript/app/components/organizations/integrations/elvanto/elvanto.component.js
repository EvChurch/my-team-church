import { reduce } from 'lodash/fp';

class ElvantoController {
  constructor(
    $rootScope, $state, toastr,
    organizationsIntegrations
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.organizationsIntegrations = organizationsIntegrations;
    this.toastr = toastr;
    this.form = { type: 'Integration::Elvanto' };
    this.errors = {};
  }
  submit() {
    this.saving = true;
    return this.organizationsIntegrations.create(this.form).then(() => {
      this.toastr.success('Syncing will occur in the background.', 'Your integration was saved successfully.');
      this.saving = false;
      this.$state.go('home');
    }).catch((error) => {
      this.toastr.error('Please review your submission and try again!', 'Error saving your integration');
      this.errors = reduce((result, error) => {
        if(error.path.length > 1) {
          result[error.path.pop()] = error.message;
        }
        return result;
      }, {}, error.graphQLErrors);
      this.saving = false;
    });
  }
}

let Integrations = {
  template: require('./elvanto.html'),
  controller: ElvantoController
};

export default angular.module('app.components.organizations.integrations.elvanto.component', [
]).component('organizationsIntegrationsElvanto', Integrations).name;
