class ForgotPasswordController {
  constructor(
    $location, $state, $window, toastr,
    user
  ) {
    this.$location = $location;
    this.$state = $state;
    this.$window = $window;
    this.user = user;
    this.email = '';

    this.toastr = toastr;
  }
  submit() {
    this.loading = true;
    this.user.forgotPassword({ email: this.email }).then((success) => {
      this.loading = false;
      if (success) {
        this.toastr.success(
          'Check your email for instructions on resetting your password',
          'Sending Reset Instructions Email'
        );
        this.$state.go('signIn');
      } else {
        this.toastr.error(
          'Maybe you typed your email incorrectly or have not signed up yet?',
          'Email Address Not Found'
        );
      }
    });
  }
}

let ForgotPassword = {
  template: require('./forgotPassword.html'),
  controller: ForgotPasswordController
};

export default angular.module('app.components.auth.forgotPassword.component', [
]).component('authForgotPassword', ForgotPassword).name;
