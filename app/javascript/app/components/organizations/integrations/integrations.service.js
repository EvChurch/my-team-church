import gql from 'graphql-tag';

class Integrations {
  constructor(
    $rootScope,
    api
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
  }
  load() {
    return this.api.query(gql`
      query integrations {
        integrations {
          id
          type
          active
        }
      }
    `).then((data) => {
      return data.integrations;
    });
  }
  get(id) {
    return this.api.query(gql`
      query integration($id: ID!){
        integration(id: $id) {
          id
          name
        }
      }
    `, { id: id }).then((data) => {
      if (data.integration) {
        return data.integration;
      } else {
        throw 'Not Found';
      }
    });
  }
  create(integration) {
    return this.api.mutate(gql`
      mutation createIntegration($integration: IntegrationInputType!) {
        createOrUpdateIntegration(
          integration: $integration
        ) {
          id
          type
          active
        }
      }
    `, { integration: integration }).then((data) => {
      const integration = data.createIntegration;
      this.$rootScope.$emit('integrationCreate', integration);
      return integration;
    });
  }
  delete(id) {
    return this.api.mutate(gql`
      mutation deleteIntegration($id: ID!) {
        deleteIntegration(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const integration = data.deleteIntegration;
      this.$rootScope.$emit('integrationDelete', integration);
      return integration;
    });
  }
}

export default angular.module('app.components.organizations.integrations.service', [
]).service('organizationsIntegrations', Integrations).name;
