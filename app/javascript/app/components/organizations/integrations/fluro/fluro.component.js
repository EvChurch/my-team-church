import { reduce } from 'lodash/fp';

class FluroController {
  constructor(
    $rootScope, $state, toastr,
    organizationsIntegrations
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.organizationsIntegrations = organizationsIntegrations;
    this.toastr = toastr;
    this.form = { type: 'Integration::Fluro' };
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

let Fluro = {
  template: require('./fluro.html'),
  controller: FluroController
};

export default angular.module('app.components.organizations.integrations.fluor.component', [
]).component('organizationsIntegrationsFluro', Fluro).name;
