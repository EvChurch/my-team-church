import Auth from './auth/index.module';
import Home from './home/home.component';
import Departments from './departments/index.module';
import Root from './root/root.component';

export default angular.module('app.components', [
  Auth,
  Home,
  Departments,
  Root
]).name;
