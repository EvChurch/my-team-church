import Api from './api/api.service';
import CountriesAndTimezones from './countriesAndTimezones/countriesAndTimezones.service';
import Navbar from './navbar/navbar.component';
import Objectives from './objectives/objectives.component';
import Sidebar from './sidebar/sidebar.component';
import User from './user/user.service';

export default angular.module('app.common', [
  Api,
  CountriesAndTimezones,
  Navbar,
  Objectives,
  Sidebar,
  User
]).name;
