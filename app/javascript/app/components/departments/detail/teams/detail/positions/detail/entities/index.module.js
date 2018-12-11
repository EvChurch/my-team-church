import Component from './entities.component';
import Service from './entities.service';
import Detail from './detail/detail.component';
import Item from './item/item.component';
import New from './new/new.controller';
import Edit from './edit/edit.controller';

export default angular.module('app.components.departments.detail.positions.detail.entities', [
  Component,
  Service,
  Detail,
  Item,
  New,
  Edit
]).name;
