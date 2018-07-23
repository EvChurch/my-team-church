import gql from 'graphql-tag';
import { pick, reduce } from 'lodash/fp';
import { resultKeyNameFromField } from 'apollo-client/data/storeUtils';

class Locations {
  constructor(
    $rootScope,
    api
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
  }
  load() {
    return this.api.query(gql`
      query locations {
        locations {
          id
          name
        }
      }
    `).then((data) => {
      return data.locations;
    });
  }
  get(id) {
    return this.api.query(gql`
      query location($id: ID!){
        location(id: $id) {
          id
          name
        }
      }
    `, { id: id }).then((data) => {
      return angular.copy(data.location);
    });
  }
  create(location) {
    return this.api.mutate(gql`
      mutation createLocation($location: LocationInputType!) {
        createLocation(
          location: $location
        ) {
          id
          name
        }
      }
    `, { location: location }).then((data) => {
      const location = data.createLocation;
      this.$rootScope.$emit('locationCreate', location);
      return location;
    });
  }
  update(id, location) {
    return this.api.mutate(gql`
      mutation updateLocation($id: ID!, $location: LocationInputType!) {
        updateLocation(
          id: $id,
          location: $location
        ) {
          id
          name
        }
      }
    `, { id: id, location: this.inputLocation(location) }).then((data) => {
      const location = data.updateLocation;
      this.$rootScope.$emit('locationUpdate', location);
      return location;
    });
  }
  delete(id) {
    return this.api.mutate(gql`
      mutation deleteLocation($id: ID!) {
        deleteLocation(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const location = data.deleteLocation;
      this.$rootScope.$emit('locationDelete', location);
      return location;
    });
  }
  inputLocation(location) {
    return pick(
      ['name'],
      location
    );
  }
}


export default angular.module('app.components.locations.service', [
]).service('locations', Locations).name;
