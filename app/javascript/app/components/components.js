import Auth from './auth/index.module';
import Home from './home/home.component';
import Departments from './departments/index.module';
import Locations from './locations/index.module';
import Organizations from './organizations/index.module';
import People from './people/index.module';
import Root from './root/root.component';
import ServiceTypes from './serviceTypes/index.module';

export default angular.module('app.components', [
  Auth,
  Home,
  Departments,
  Locations,
  Organizations,
  People,
  Root,
  ServiceTypes
]).name;
