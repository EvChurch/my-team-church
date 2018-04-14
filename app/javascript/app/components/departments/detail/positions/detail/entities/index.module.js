import Component from './entities.component';
import Service from './entities.service';
import Detail from './detail/detail.component';
import New from './new/new.controller';

export default angular.module('app.components.departments.detail.positions.detail.entities', [
  Component,
  Service,
  Detail,
  New
]).name;
