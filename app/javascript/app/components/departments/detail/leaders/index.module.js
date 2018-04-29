import Component from './leaders.component';
import Service from './leaders.service';
import New from './new/new.controller';

export default angular.module('app.components.departments.detail.leaders', [
  Component,
  Service,
  New
]).name;
