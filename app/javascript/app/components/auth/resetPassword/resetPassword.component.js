class ResetPasswordController {
  constructor(
    $location, $state, $stateParams, $window, toastr,
    user
  ) {
    this.$location = $location;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$window = $window;
    this.user = user;
    this.password = '';
    this.passwordConfirmation = '';

    this.toastr = toastr;
  }
  submit() {
    this.loading = true;
    const resetPassword = {
      password: this.password,
      reset_password_token: this.$stateParams.token
    }
    this.user.resetPassword(resetPassword).then((success) => {
      this.loading = false;
      if (success) {
        this.toastr.success(
          'Your password has been successfully reset. Try to sign in again!',
          'Password Reset'
        );
        this.$state.go('signIn');
      }
      else {
        this.toastr.error(
          'Looks like you have already tried to reset your account using this token.',
          'Invalid Token for Password Reset'
        );
      }
    });
  }
}

let ResetPassword = {
  template: require('./resetPassword.html'),
  controller: ResetPasswordController
};

export default angular.module('app.components.auth.resetPassword.component', [
]).component('authResetPassword', ResetPassword).name;
