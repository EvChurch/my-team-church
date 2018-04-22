class SignInController {
  constructor(
    $state, toastr,
    user
  ) {
    this.$state = $state;
    this.user = user;
    this.email = '';
    this.password = '';

    this.toastr = toastr;
  }
  submit() {
    this.loading = true;
    this.user.signIn({ email: this.email, password: this.password }).then(() => {
      this.loading = false;
      this.$state.go('home');
    }).catch(() => {
      this.toastr.error('Incorrect Credentials', 'Error');
      this.loading = false;
    });
  }
}

let SignIn = {
  bindings: {},
  template: require('./signIn.html'),
  controller: SignInController
};

export default angular.module('app.components.auth.signIn.component', [
]).component('authSignIn', SignIn).name;
