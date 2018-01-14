import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import AngularApollo from 'angular1-apollo';
import appConfig from './app.config';
import appRun from './app.run';

angular.module('admin', [
    AngularApollo,
    uiRouter,
    Common,
    Components
  ])
  .config(appConfig)
  .run(appRun)
  .component('app', AppComponent);
