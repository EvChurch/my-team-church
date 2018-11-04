import AppComponent from './app.component';
import appConfig from './app.config';
import appRun from './app.run';
import angular from 'angular';
import AngularApollo from 'angular1-apollo';
import Common from './common/common';
import Components from './components/components';
import ngAnimate from 'angular-animate';
import uiRouter from 'angular-ui-router';
import 'angular-strap';
import 'angular-toastr';
import 'angular-trix';
import 'countries-and-timezones';
import 'ng-sortable';
import 'ngclipboard';

angular.module('app', [
  AngularApollo,
  Common,
  Components,
  ngAnimate,
  uiRouter,
  'mgcrea.ngStrap',
  'toastr',
  'angularTrix',
  'as.sortable',
  'ngclipboard'
])
  .config(appConfig)
  .run(appRun)
  .component('app', AppComponent);
