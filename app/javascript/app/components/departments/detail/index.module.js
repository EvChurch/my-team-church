import Component from './detail.component';
import Leaders from './leaders/index.module';
import Positions from './positions/index.module';

export default angular.module('app.components.departments.detail', [
  Component,
  Leaders,
  Positions
]).name;
