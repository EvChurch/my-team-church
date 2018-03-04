import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import AngularApollo from 'angular1-apollo';
import appConfig from './app.config';
import appRun from './app.run';
import 'countries-and-timezones';
import 'angular-strap';

angular.module('app', [
  AngularApollo,
  uiRouter,
  ngAnimate,
  Common,
  Components,
  'mgcrea.ngStrap'
])
  .config(appConfig)
  .run(appRun)
  .component('app', AppComponent);