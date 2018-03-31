import Component from './positions.component';
import Service from './positions.service';
import Detail from './detail/index.module';
import Edit from './edit/edit.controller';
import New from './new/new.controller';

export default angular.module('app.components.departments.detail.positions', [
  Component,
  Service,
  Detail,
  Edit,
  New
]).name;
