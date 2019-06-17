import { find, isEqual } from 'lodash/fp';

class SignUpController {
  constructor($location, $state, $window, user) {
    this.$location = $location;
    this.$state = $state;
    this.$window = $window;
    this.user = user;
    this.email = '';
    this.password = '';
  }
  submit() {
    this.loading = true;
    this.errorMessage = null;
    this.user.signUp({
      email: this.email,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name
    }).then(() => {
      let redirect = this.$window.localStorage.getItem('redirect');
      this.loading = false;
      if (redirect) {
        this.$window.localStorage.removeItem('redirect');
        this.$window.location.href = redirect;
      } else {
        this.$state.go('home');
      }
    }).catch((error) => {
      this.loading = false;
      if (error.graphQLErrors) {
        let messageObj = find((obj) => isEqual(obj.path, ['createUser']), error.graphQLErrors);
        this.errorMessage = messageObj.message;
      }
    });
  }
}

let SignUp = {
  template: require('./signUp.html'),
  controller: SignUpController
};

export default angular.module('app.components.auth.signUp.component', [
]).component('authSignUp', SignUp).name;
