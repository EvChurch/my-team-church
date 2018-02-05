import Component from './auth.component';
import SignIn from './signIn/signIn.component';
import SignUp from './signUp/signUp.component';

export default angular.module('app.components.auth', [
  Component,
  SignIn,
  SignUp
]).name;
