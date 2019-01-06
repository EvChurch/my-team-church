import 'expose-loader?$!jquery'; // import before angular to replace jqlite
import * as angular from 'angular';
import AppComponent from './app.component';
import appConfig from './app.config';
import appRun from './app.run';
import AngularApollo from 'angular1-apollo';
import Common from './common/common';
import Components from './components/components';
import ngAnimate from 'angular-animate';
import uiRouter from 'angular-ui-router';
import 'angular-chosen-localytics';
import 'angular-strap';
import 'angular-toastr';
import 'angular-trix';
import 'chosen-js';
import 'countries-and-timezones';
import 'ng-sortable';
import 'ngclipboard';
import 'trix';
import 'orgchart';

angular.module('app', [
  AngularApollo,
  Common,
  Components,
  ngAnimate,
  uiRouter,
  'angularTrix',
  'as.sortable',
  'localytics.directives',
  'mgcrea.ngStrap',
  'ngclipboard',
  'toastr'
])
  .config(appConfig)
  .run(appRun)
  .component('app', AppComponent);
