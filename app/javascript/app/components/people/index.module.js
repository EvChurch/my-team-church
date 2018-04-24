import Component from './people.component';
import Service from './people.service';
import Detail from './detail/detail.component';
import Search from './search/search.component';

export default angular.module('app.components.people', [
  Component,
  Service,
  Detail,
  Search
]).name;
