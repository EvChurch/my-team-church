import Api from './api/api.service';
import Autofocus from './autofocus/autofocus.directive';
import Avatar from './avatar/avatar.component';
import CompareTo from './compareTo/compareTo.directive';
import CountriesAndTimezones from './countriesAndTimezones/countriesAndTimezones.service';
import LoadingList from './loadingList/loadingList.component';
import Modal from './modal/index.module';
import Navbar from './navbar/navbar.component';
import Objectives from './objectives/index.module';
import Sidebar from './sidebar/sidebar.component';
import Upload from './upload/upload.service';
import User from './user/user.service';

export default angular.module('app.common', [
  Api,
  Autofocus,
  Avatar,
  CompareTo,
  CountriesAndTimezones,
  LoadingList,
  Modal,
  Navbar,
  Objectives,
  Sidebar,
  Upload,
  User
]).name;
