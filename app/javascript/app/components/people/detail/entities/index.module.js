import Component from './entities.component';
import Service from './entities.service';
import Detail from './detail/detail.component';

export default angular.module('app.components.people.detail.entities', [
  Component,
  Service,
  Detail
]).name;
