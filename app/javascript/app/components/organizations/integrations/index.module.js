import Component from './integrations.component';
import Service from './integrations.service';
import Elvanto from './elvanto/elvanto.component';
import Fluro from './fluro/fluro.component';

export default angular.module('app.components.organizations.integrations', [
  Component,
  Service,
  Elvanto,
  Fluro
]).name;
