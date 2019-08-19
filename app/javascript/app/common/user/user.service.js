import gql from 'graphql-tag';

class User {
  constructor($window, api) {
    this.$window = $window;
    this.api = api;
  }
  load(reset = false) {
    let token = this.$window.localStorage.getItem('token');

    if (!token) {
      return Promise.reject('Not Logged In');
    }

    if (this.data && !reset) {
      return Promise.resolve(this.data);
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
  signIn(user) {
    return this.api.mutate(gql`
      mutation authenticateUser($user: UserInputType!) {
        authenticateUser(
          user: $user
        ) {
          first_name
          last_name
          email
          token
        }
      }
    `, { user: user }).then((data) => {
      this.data = data.authenticateUser;
      if (!data.authenticateUser) {
        return Promise.reject('Incorrect Credentials');
      }
      this.$window.localStorage.setItem('token', this.data.token);
      return this.data;
    });
  }
  signUp(user) {
    return this.api.mutate(gql`
      mutation createUser($user: UserInputType!) {
        createUser(
          user: $user
        ) {
          first_name
          last_name
          email
          token
        }
      }
    `, { user: user }).then((data) => {
      this.data = data.createUser;
      this.$window.localStorage.setItem('token', this.data.token);
      this.data = data.user;
      return this.data;
    });
  }
  signOut() {
    this.$window.localStorage.removeItem('token');
    this.data = null;
    return Promise.resolve();
  }
  forgotPassword(userPasswordForgot) {
    return this.api.mutate(gql`
      mutation forgotUserPassword($userPasswordForgot: UserPasswordForgotInputType!) {
        forgotUserPassword(
          user_password_forgot: $userPasswordForgot
        )
      }
    `, { userPasswordForgot: userPasswordForgot }).then((data) => {
      return data.forgotUserPassword;
    });
  }
  resetPassword(userPasswordReset) {
    return this.api.mutate(gql`
      mutation resetUserPassword($userPasswordReset: UserPasswordResetInputType!) {
        resetUserPassword(
          user_password_reset: $userPasswordReset
        )
      }
    `, { userPasswordReset: userPasswordReset }).then((data) => {
      return data.resetUserPassword;
    });
  }
  updatePassword(userPassword) {
    return this.api.mutate(gql`
      mutation updateUserPassword($userPassword: UserPasswordInputType!) {
        updateUserPassword(
          user_password: $userPassword
        )
      }
    `, { userPassword: userPassword }).then((data) => {
      return data.updateUserPassword;
    });
  }
}


export default angular.module('app.common.user.service', [
]).service('user', User).name;
