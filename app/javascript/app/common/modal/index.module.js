import Component from './modal.component';
import Service from './modal.service';
import Confirm from './confirm/confirm.controller';
import Delete from './delete/delete.controller';
import Info from './info/info.controller';

export default angular.module('app.common.modal', [
  Component,
  Service,
  Confirm,
  Delete,
  Info
]).name;
