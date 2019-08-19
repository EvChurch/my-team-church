class UpdatePasswordController {
  constructor(
    $location, $state, $window, toastr,
    user
  ) {
    this.$location = $location;
    this.$state = $state;
    this.$window = $window;
    this.user = user;
    this.passwordCurrent = '';
    this.password = '';
    this.passwordConfirmation = '';

    this.toastr = toastr;
  }
  submit() {
    this.loading = true;
    const updatePassword = {
      current_password: this.passwordCurrent,
      password: this.password,
    }
    this.user.updatePassword(updatePassword).then((success) => {
      this.loading = false;
      if (success) {
        this.password = '';
        this.passwordConfirmation = '';
        this.toastr.success(
          'Your password has been successfully updated',
          'Password Updated'
        );
        this.$state.go('home');
      } else {
        this.toastr.error(
          'Your current password is incorrect',
          'Unable to Update Password'
        );
      }
    }).catch(() => {
      this.loading = false;
    });
  }
}

let UpdatePassword = {
  template: require('./updatePassword.html'),
  controller: UpdatePasswordController
};

export default angular.module('app.components.auth.updatePassword.component', [
]).component('authUpdatePassword', UpdatePassword).name;
