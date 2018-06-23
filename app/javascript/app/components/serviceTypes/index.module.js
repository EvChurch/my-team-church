import Component from './serviceTypes.component';
import Service from './serviceTypes.service';
import Detail from './detail/index.module';
import Search from './search/search.component';

export default angular.module('app.components.serviceTypes', [
  Component,
  Service,
  Detail,
  Search
]).name;
