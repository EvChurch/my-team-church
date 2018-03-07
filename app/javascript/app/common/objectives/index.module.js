import Component from './objectives.component';
import Service from './objectives.service';
import Detail from './detail/detail.component';
import Edit from './edit/edit.controller';
import New from './new/new.controller';

export default angular.module('app.common.objectives', [
  Component,
  Service,
  Detail,
  Edit,
  New
]).name;
