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
          user_get {
            first_name
            last_name
            email
          }
        }
      `).then((data) => {
        this.data = data.user_get;
        return this.data;
      })
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
              avatar_url
              point {
                address_line_1
                address_line_2
                suburb
                city
                country
                zip
                latitude
                longitude
              }
            }
          }
        }
      `, user).then((data) => {
        this.data = data.user;
        return this.data;
      })
    }

    logout() {
      return this.api.logout().then(() => {
        this.data = null;
      })
    }
}


export default angular.module('app.components.user.service', [
]).service('user', User).name;
