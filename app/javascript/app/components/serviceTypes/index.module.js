import Component from './serviceTypes.component';
import Service from './serviceTypes.service';
import Detail from './detail/index.module';

export default angular.module('app.components.serviceTypes', [
  Component,
  Service,
  Detail
]).name;
