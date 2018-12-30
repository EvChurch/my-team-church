import Admins from './admins/index.module';
import Auth from './auth/index.module';
import Home from './home/home.component';
import Departments from './departments/index.module';
import Organizations from './organizations/index.module';
import People from './people/index.module';
import Root from './root/root.component';

export default angular.module('app.components', [
  Admins,
  Auth,
  Home,
  Departments,
  Organizations,
  People,
  Root
]).name;
