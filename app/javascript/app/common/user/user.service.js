import gql from 'graphql-tag';

class User {
  constructor(api) {
    this.api = api;
  }
  load(reset = false) {
    if (this.data && !reset) {
      Promise.resolve(this.data);
    }

    return this.api.query(gql`
        query {
          user {
            first_name
            last_name
            email
          }
        }
      `).then((data) => {
      this.data = data.user;
      return this.data;
    });
  }
  updateUser(user) {
    return this.api.mutate(gql`
        mutation updateUser($first_name: String!, $last_name: String!) {
          updateUserMutatation(input: {
            first_name: $first_name,
            last_name: $last_name
          }) {
            user {
              first_name
              last_name
              email
            }
          }
        }
      `, user).then((data) => {
      this.data = data.user;
      return this.data;
    });
  }
}


export default angular.module('app.common.user.service', [
]).service('user', User).name;
