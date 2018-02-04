import Component from './departments.component';
import Service from './departments.service';
import Detail from './detail/index.module';
import List from './list/index.module';

export default angular.module('app.components.departments', [
  Component,
  Service,
  Detail,
  List
]).name;
