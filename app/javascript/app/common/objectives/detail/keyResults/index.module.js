import Component from './keyResults.component';
import Service from './keyResults.service';
import New from './new/new.component';
import Edit from './edit/edit.controller';
import Item from './item/item.component';

export default angular.module('app.common.objective.detail.keyResults', [
  Component,
  Service,
  New,
  Edit,
  Item
]).name;
