import Component from './departments.component';
import Service from './departments.service';
import Detail from './detail/index.module';
import List from './list/index.module';
import New from './new/new.controller';
import Edit from './edit/edit.controller';

export default angular.module('app.components.departments', [
  Component,
  Service,
  Detail,
  List,
  New,
  Edit
]).name;
