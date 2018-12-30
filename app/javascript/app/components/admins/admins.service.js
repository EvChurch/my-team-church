import gql from 'graphql-tag';
import { reduce } from 'lodash/fp';

class Admins {
  constructor(
    $rootScope,
    api, modal
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
    this.modal = modal;
  }
  loadUsers(searchString, cursor = 'opaqueCursor') {
    return this.api.query(gql`
      query users(
        $search_string: String
        $cursor: String
      ) {
        users(
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
              email
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `, { search_string: searchString, cursor: cursor }).then((data) => {
      let result = reduce((result, edge) => {
        result.push(edge);
        return result;
      }, [], data.users.edges);
      result.hasNextPage = data.users.pageInfo.hasNextPage;
      return result;
    });
  }
  load() {
    return this.api.query(gql`
      query admins {
        admins {
          id
          first_name
          last_name
          email
        }
      }
    `).then((data) => {
      return data.admins;
    });
  }
  create(id) {
    return this.api.mutate(gql`
      mutation createAdmin(
        $id: ID!
      ) {
        createAdmin(
          id: $id
        ) {
          id
          first_name
          last_name
          email
        }
      }
    `, { id: id }).then((data) => {
      const admin = data.createAdmin;
      this.$rootScope.$emit('adminCreate', admin);
      return admin;
    });
  }
  delete(id) {
    return this.api.mutate(gql`
      mutation deleteAdmin(
        $id: ID!
      ) {
        deleteAdmin(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const admin = data.deleteAdmin;
      this.$rootScope.$emit('adminDelete', admin);
      return admin;
    });
  }
  openNewModal() {
    return this.modal.open({
      template: require('./new/new.html'),
      controller: 'adminsNewModalController'
    });
  }
}

export default angular.module('app.components.admins.service', [
]).service('admins', Admins).name;
