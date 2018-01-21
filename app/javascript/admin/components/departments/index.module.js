import Component from './departments.component';
import Service from './departments.service';
import Detail from './detail/detail.component';

export default angular.module('app.components.departments', [
  Component,
  Service,
  Detail
]).name
