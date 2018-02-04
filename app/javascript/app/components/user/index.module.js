import Component from './user.component';
import Service from './user.service';
import Item from './item/item.component';

export default angular.module('app.components.user', [
  Component,
  Service,
  Item
]).name;
