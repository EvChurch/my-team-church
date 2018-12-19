class SignInController {
  constructor(
    $location, $state, $window, toastr,
    user
  ) {
    this.$location = $location;
    this.$state = $state;
    this.$window = $window;
    this.user = user;
    this.email = '';
    this.password = '';

    this.toastr = toastr;
  }
  submit() {
    this.loading = true;
    this.user.signIn({ email: this.email, password: this.password }).then(() => {
      let redirect = this.$window.localStorage.getItem('redirect');
      this.loading = false;
      if (redirect) {
        this.$window.localStorage.removeItem('redirect');
        this.$window.location.href = redirect;
      } else {
        this.$state.go('home');
      }
    }).catch(() => {
      this.toastr.error('Incorrect Credentials', 'Error');
      this.loading = false;
    });
  }
}

let SignIn = {
  template: require('./signIn.html'),
  controller: SignInController
};

export default angular.module('app.components.auth.signIn.component', [
]).component('authSignIn', SignIn).name;
