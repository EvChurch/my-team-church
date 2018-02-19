import Component from './organizations.component';
import Service from './organizations.service';
import Create from './create/create.component';
import Connect from './connect/connect.component';
import Dropdown from './dropdown/dropdown.component';
import Edit from './edit/edit.component';

export default angular.module('app.components.organizations', [
  Component,
  Service,
  Create,
  Connect,
  Dropdown,
  Edit
]).name;
