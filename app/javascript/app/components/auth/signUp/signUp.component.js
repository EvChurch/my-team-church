class SignUpController {
  constructor($state, user) {
    this.$state = $state;
    this.user = user;
    this.email = '';
    this.password = '';
  }
  submit() {
    this.loading = true;
    this.user.signUp({
      email: this.email,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name
    }).then(() => {
      this.loading = false;
      this.$state.go('home');
    });
  }
}

let SignUp = {
  bindings: {},
  template: require('./signUp.html'),
  controller: SignUpController
};

export default angular.module('app.components.auth.signUp.component', [
]).component('authSignUp', SignUp).name;
