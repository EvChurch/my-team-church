import Home from './home/home.component';
import Departments from './departments/index.module';
import Root from './root/root.component';

export default angular.module('app.components', [
  Home,
  Departments,
  Root
]).name;
