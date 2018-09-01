import Component from './items.component';
import Service from './items.service';
import Detail from './detail/detail.component';
import New from './new/new.component';

export default angular.module('app.components.departments.detail.positions.detail.items', [
  Component,
  Service,
  Detail,
  New
]).name;
