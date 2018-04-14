import gql from 'graphql-tag';

class People {
  constructor(
    $rootScope,
    api
  ) {
    this.api = api;
  }
  load(searchString) {
    return this.api.query(gql`
      query people($search_string: String) {
        people(
          search_string: $search_string
        ) {
          id
          first_name
          last_name
          picture
          email
        }
      }
    `, { search_string: searchString }).then((data) => {
      return data.people;
    });
  }
}


export default angular.module('app.common.people.service', [
]).service('people', People).name;
