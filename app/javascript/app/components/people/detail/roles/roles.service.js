import gql from 'graphql-tag';

class Roles {
  constructor(
    $rootScope,
    api
  ) {
    this.$rootScope = $rootScope;
    this.api = api;
  }
  loadDepartmentLeaders(personId) {
    return this.api.query(gql`
      query personDepartmentLeaders(
        $person_id: ID!
      ) {
        personDepartmentLeaders(
          person_id: $person_id
        ) {
          id
          department {
            id
            name
          }
        }
      }
    `, { person_id: personId }).then((data) => {
      return data.personDepartmentLeaders
    });
  }
  loadTeamLeaders(personId) {
    return this.api.query(gql`
      query personTeamLeaders(
        $person_id: ID!
      ) {
        personTeamLeaders(
          person_id: $person_id
        ) {
          id
          team {
            id
            name
          }
        }
      }
    `, { person_id: personId }).then((data) => {
      return data.personTeamLeaders
    });
  }
}

export default angular.module('app.components.people.detail.roles.service', [
]).service('peopleDetailRoles', Roles).name;
