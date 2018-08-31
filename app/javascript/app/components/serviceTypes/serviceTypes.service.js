import gql from 'graphql-tag';
import { pick } from 'lodash/fp';

class ServiceTypes {
  constructor(
    $rootScope,
    api
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
  }
  load() {
    return this.api.query(gql`
      query serviceTypes {
        serviceTypes {
          id
          name
        }
      }
    `).then((data) => {
      return data.serviceTypes;
    });
  }
  get(id) {
    return this.api.query(gql`
      query serviceType($id: ID!){
        serviceType(id: $id) {
          id
          name
        }
      }
    `, { id: id }).then((data) => {
      return angular.copy(data.serviceType);
    });
  }
  create(serviceType) {
    return this.api.mutate(gql`
      mutation createServiceType($serviceType: ServiceTypeInputType!) {
        createServiceType(
          service_type: $serviceType
        ) {
          id
          name
        }
      }
    `, { serviceType: serviceType }).then((data) => {
      const serviceType = data.createServiceType;
      this.$rootScope.$emit('serviceTypeCreate', serviceType);
      return serviceType;
    });
  }
  update(id, serviceType) {
    return this.api.mutate(gql`
      mutation updateServiceType($id: ID!, $serviceType: ServiceTypeInputType!) {
        updateServiceType(
          id: $id,
          service_type: $serviceType
        ) {
          id
          name
        }
      }
    `, { id: id, serviceType: this.inputServiceType(serviceType) }).then((data) => {
      const serviceType = data.updateServiceType;
      this.$rootScope.$emit('serviceTypeUpdate', serviceType);
      return serviceType;
    });
  }
  delete(id) {
    return this.api.mutate(gql`
      mutation deleteServiceType($id: ID!) {
        deleteServiceType(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const serviceType = data.deleteServiceType;
      this.$rootScope.$emit('serviceTypeDelete', serviceType);
      return serviceType;
    });
  }
  inputServiceType(serviceType) {
    return pick(
      ['name'],
      serviceType
    );
  }
}


export default angular.module('app.components.serviceTypes.service', [
]).service('serviceTypes', ServiceTypes).name;
