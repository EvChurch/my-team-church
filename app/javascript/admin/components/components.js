import Home from './home/home.component';
import Departments from './departments/index.module';
import Root from './root/root.component';
import User from './user/user.component';

export default angular.module('app.components', [
  Home,
  Departments,
  Root,
  User
]).name;
