import Component from './objectives.component';
import Service from './objectives.service';
import Detail from './detail/index.module';
import Edit from './edit/edit.controller';
import New from './new/new.controller';

export default angular.module('app.common.objectives', [
  Component,
  Service,
  Detail,
  Edit,
  New
]).name;
