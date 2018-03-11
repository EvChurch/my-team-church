import Component from './positions.component';
import Service from './positions.service';
import Edit from './edit/edit.controller';
import New from './new/new.controller';

export default angular.module('app.components.departments.detail.positions', [
  Component,
  Service,
  Edit,
  New
]).name;
