import Component from './locations.component';
import Service from './locations.service';
import Detail from './detail/index.module';
import Search from './search/search.component';

export default angular.module('app.components.locations', [
  Component,
  Service,
  Detail,
  Search
]).name;
