import Service from './people.service';
import Search from './search/search.component';

export default angular.module('app.common.people', [
  Service,
  Search
]).name;
