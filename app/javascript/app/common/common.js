import Api from './api/api.service';
import CountriesAndTimezones from './countriesAndTimezones/countriesAndTimezones.service';
import Modal from './modal/index.module';
import Navbar from './navbar/navbar.component';
import Objectives from './objectives/index.module';
import People from './people/index.module';
import Sidebar from './sidebar/sidebar.component';
import User from './user/user.service';

export default angular.module('app.common', [
  Api,
  CountriesAndTimezones,
  Modal,
  Navbar,
  Objectives,
  People,
  Sidebar,
  User
]).name;
