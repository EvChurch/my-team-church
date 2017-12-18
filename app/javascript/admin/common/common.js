import Api from './api/api.service';
import Navbar from './navbar/navbar.component';

export default angular.module('app.common', [
  Api,
  Navbar
]).name;
