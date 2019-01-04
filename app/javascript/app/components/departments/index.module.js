import Component from './departments.component';
import Service from './departments.service';
import Chart from './chart/chart.component';
import Detail from './detail/index.module';
import List from './list/index.module';
import New from './new/new.controller';
import Edit from './edit/edit.controller';

export default angular.module('app.components.departments', [
  Component,
  Service,
  Chart,
  Detail,
  List,
  New,
  Edit
]).name;
