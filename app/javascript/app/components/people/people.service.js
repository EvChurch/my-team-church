import gql from 'graphql-tag';
import { reduce } from 'lodash/fp';

class People {
  constructor(
    $rootScope,
    api
  ) {
    this.api = api;
  }
  load(searchString, cursor = 'opaqueCursor') {
    return this.api.query(gql`
      query people(
        $search_string: String
        $cursor: String
      ) {
        people(
          search_string: $search_string
          first: 25
          after: $cursor
        ) {
          edges {
            cursor
            node {
              id
              first_name
              last_name
              picture
              email
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `, { search_string: searchString, cursor: cursor }).then((data) => {
      let result = reduce(function(result, edge) {
        result.push(edge);
        return result;
      }, [], data.people.edges);
      result.hasNextPage = data.people.pageInfo.hasNextPage;
      return result;
    });
  }
}


export default angular.module('app.components.people.service', [
]).service('people', People).name;
