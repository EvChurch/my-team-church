import Api from './api/api.service';
import Navbar from './navbar/navbar.component';
import Objectives from './objectives/objectives.component';
import Sidebar from './sidebar/sidebar.component';

export default angular.module('app.common', [
  Api,
  Navbar,
  Objectives,
  Sidebar
]).name;
