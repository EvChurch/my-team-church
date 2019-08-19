import Component from './auth.component';
import ForgotPassword from './forgotPassword/forgotPassword.component';
import ResetPassword from './resetPassword/resetPassword.component';
import SignIn from './signIn/signIn.component';
import SignUp from './signUp/signUp.component';
import UpdatePassword from './updatePassword/updatePassword.component';

export default angular.module('app.components.auth', [
  Component,
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
  UpdatePassword
]).name;
