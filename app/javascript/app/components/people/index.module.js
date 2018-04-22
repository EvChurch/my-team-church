import Component from './people.component';
import Service from './people.service';
import Search from './search/search.component';

export default angular.module('app.components.people', [
  Component,
  Service,
  Search
]).name;
