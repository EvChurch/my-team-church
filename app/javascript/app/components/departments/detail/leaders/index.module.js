import Component from './leaders.component';
import Service from './leaders.service';
import Detail from './detail/detail.component';
import Item from './item/item.component';
import New from './new/new.controller';

export default angular.module('app.components.departments.detail.leaders', [
  Component,
  Service,
  Detail,
  Item,
  New
]).name;
