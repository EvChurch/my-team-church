import Component from './roles.component';
import Service from './roles.service';
import Entity from './entity/index.module';

export default angular.module('app.components.people.detail.roles', [
  Component,
  Service,
  Entity
]).name;
