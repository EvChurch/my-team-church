import Component from './admins.component';
import Service from './admins.service';
import New from './new/new.controller';
import Search from './search/search.component';

export default angular.module('app.components.admins', [
  Component,
  Service,
  New,
  Search
]).name;
