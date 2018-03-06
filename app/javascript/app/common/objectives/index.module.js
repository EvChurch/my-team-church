import Component from './objectives.component';
import Service from './objectives.service';
import Edit from './edit/edit.controller';
import New from './new/new.controller';

export default angular.module('app.common.objectives', [
  Component,
  Service,
  Edit,
  New
]).name;
