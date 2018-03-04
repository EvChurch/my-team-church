import gql from 'graphql-tag';

class Organizations {
  constructor(api) {
    this.api = api;
  }
  load(reset = false) {
    if (this.data && !reset) {
      Promise.resolve(this.data);
    }

    return this.api.query(gql`
        query {
          organizations {
            id
            name
          }
        }
      `).then((data) => {
      this.data = data.organizations;
      this.primary = this.data.length > 0 ? this.data[0] : null;
      this.api.organization_id = this.primary ? this.primary.id : null;
      return this.data;
    });
  }
  get(id) {
    return this.api.query(gql`
      query organization($id: ID!){
        organization(id: $id) {
          id
          name
          address_1
          address_2
          website_url
          city
          state
          zip
          country
          time_zone
        }
      }
    `, { id: id }).then((data) => {
      return data.organization;
    });
  }
  create(organization) {
    return this.api.mutate(gql`
      mutation createOrganization($organization: OrganizationInputType!) {
        createOrganization(
          organization: $organization
        ) {
          id
          name
        }
      }
    `, { organization: organization }).then((data) => {
      return data.createOrganization;
    });
  }
}

export default angular.module('app.components.organizations.service', [
]).service('organizations', Organizations).name;