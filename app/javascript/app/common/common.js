import Api from './api/api.service';
import Avatar from './avatar/avatar.component';
import Autofocus from './autofocus/autofocus.directive';
import CountriesAndTimezones from './countriesAndTimezones/countriesAndTimezones.service';
import LoadingList from './loadingList/loadingList.component';
import Modal from './modal/index.module';
import Navbar from './navbar/navbar.component';
import Objectives from './objectives/index.module';
import Sidebar from './sidebar/sidebar.component';
import Trix from './trix/trix.service';
import User from './user/user.service';

export default angular.module('app.common', [
  Api,
  Avatar,
  Autofocus,
  CountriesAndTimezones,
  LoadingList,
  Modal,
  Navbar,
  Objectives,
  Sidebar,
  Trix,
  User
]).name;
