import gql from 'graphql-tag';
import { pick, reduce } from 'lodash/fp';

class People {
  constructor(
    $q, $rootScope,
    api
  ) {
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.api = api;
    this.me = null;
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
      let result = reduce((result, edge) => {
        result.push(edge);
        return result;
      }, [], data.people.edges);
      result.hasNextPage = data.people.pageInfo.hasNextPage;
      return result;
    });
  }
  get(id) {
    return this.api.query(gql`
      query person($id: ID!){
        person(id: $id) {
          id
          first_name
          last_name
          picture
          email
          mobile
          phone
          gender
          invite_url
          users {
            id
            first_name
            last_name
            email
          }
        }
      }
    `, { id: id }).then((data) => {
      if (data.person) {
        return data.person;
      } else {
        throw 'Not Found';
      }
    });
  }
  getMe() {
    if(this.me !== null) {
      return this.$q.resolve(this.me);
    }
    return this.api.query(gql`
      query me {
        me {
          id
          first_name
          last_name
          picture
          email
          mobile
          phone
          gender
          invite_url
          users {
            id
            first_name
            last_name
            email
          }
        }
      }
    `).then((data) => {
      this.me = data.me;
      return angular.copy(data.me);
    });
  }
  create(person) {
    return this.api.mutate(gql`
      mutation createPerson($person: PersonInputType!) {
        createPerson(
          person: $person
        ) {
          id
          first_name
          last_name
          picture
          email
          mobile
          phone
          gender
          invite_url
        }
      }
    `, { person: person }).then((data) => {
      const person = data.createPerson;
      this.$rootScope.$emit('personCreate', person);
      return person;
    });
  }
  update(id, person) {
    return this.api.mutate(gql`
      mutation updatePerson($id: ID!, $person: PersonInputType!) {
        updatePerson(
          id: $id,
          person: $person
        ) {
          id
          first_name
          last_name
          picture
          email
          mobile
          phone
          gender
          invite_url
        }
      }
    `, { id: id, person: this.inputPerson(person) }).then((data) => {
      const person = data.updatePerson;
      this.$rootScope.$emit('personUpdate', person);
      return person;
    });
  }
  invite(id) {
    return this.api.mutate(gql`
      mutation invitePerson($id: ID!) {
        invitePerson(
          id: $id,
        ) {
          id
        }
      }
    `, { id: id }).then((data) => {
      const person = data.invitePerson;
      this.$rootScope.$emit('personInvite', person);
      return person;
    });
  }
  inputPerson(person) {
    return pick(
      ['first_name', 'last_name', 'email', 'mobile', 'phone', 'gender'],
      person
    );
  }
}


export default angular.module('app.components.people.service', [
]).service('people', People).name;
