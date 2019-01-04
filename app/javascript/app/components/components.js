import Admins from './admins/index.module';
import Auth from './auth/index.module';
import Chart from './chart/chart.component';
import Home from './home/home.component';
import Departments from './departments/index.module';
import Organizations from './organizations/index.module';
import People from './people/index.module';
import Root from './root/root.component';
import Teams from './teams/teams.component';

export default angular.module('app.components', [
  Admins,
  Auth,
  Chart,
  Home,
  Departments,
  Organizations,
  People,
  Root,
  Teams
]).name;
