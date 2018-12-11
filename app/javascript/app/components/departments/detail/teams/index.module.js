import Component from './teams.component';
import Service from './teams.service';
import Detail from './detail/index.module';
import Edit from './edit/edit.controller';
import New from './new/new.controller';

export default angular.module('app.components.departments.detail.teams', [
  Component,
  Service,
  Detail,
  Edit,
  New
]).name;
