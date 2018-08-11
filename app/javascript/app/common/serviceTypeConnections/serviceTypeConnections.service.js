import gql from 'graphql-tag';

class ServiceTypeConnections {
  constructor(
    $rootScope,
    api
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
  }
  load(resourceId, resourceType) {
    return this.api.query(gql`
      query serviceTypeConnections($resource_id: ID!, $resource_type: String!) {
        serviceTypeConnections(
          resource_id: $resource_id,
          resource_type: $resource_type
        ) {
          id
          service_type {
              id
          }
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType }).then((data) => {
      return data.serviceTypeConnections;
    });
  }
  get(resourceId, resourceType, id) {
    return this.api.query(gql`
      query serviceTypeConnection($resource_id: ID!, $resource_type: String!, $id: ID!){
        serviceTypeConnection(
          resource_id: $resource_id,
          resource_type: $resource_type,
          id: $id
        ) {
          id
          service_type {
              id
          }
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType, id: id }).then((data) => {
      return data.serviceTypeConnection;
    });
  }
  create(resourceId, resourceType, serviceTypeConnection) {
    return this.api.mutate(gql`
      mutation createServiceTypeConnection(
        $resource_id: ID!,
        $resource_type: String!,
        $service_type_connection: ServiceTypeConnectionInputType!
      ) {
        createServiceTypeConnection(
          resource_id: $resource_id,
          resource_type: $resource_type,
          service_type_connection: $service_type_connection
        ) {
          id
          service_type {
              id
              name
          }
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType, service_type_connection: serviceTypeConnection }).then((data) => {
      const serviceTypeConnection = data.createServiceTypeConnection;
      this.$rootScope.$emit('serviceTypeConnectionCreate', resourceId, resourceType, serviceTypeConnection);
      return serviceTypeConnection;
    });
  }
  delete(resourceId, resourceType, id) {
    return this.api.mutate(gql`
      mutation deleteServiceTypeConnection(
        $resource_id: ID!,
        $resource_type: String!,
        $id: ID!
      ) {
        deleteServiceTypeConnection(
          resource_id: $resource_id,
          resource_type: $resource_type,
          id: $id,
        ) {
          id
          service_type {
              id
              name
          }
        }
      }
    `, { resource_id: resourceId, resource_type: resourceType, id: id }).then((data) => {
      const serviceTypeConnection = data.deleteServiceTypeConnection;
      this.$rootScope.$emit('serviceTypeConnectionDelete', resourceId, resourceType, serviceTypeConnection);
      return serviceTypeConnection;
    });
  }
}


export default angular.module('app.common.serviceTypeConnections.service', [
]).service('serviceTypeConnections', ServiceTypeConnections).name;
