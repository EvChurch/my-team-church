import Component from './detail.component';
import Leaders from './leaders/index.module';
import Teams from './teams/index.module';

export default angular.module('app.components.departments.detail', [
  Component,
  Leaders,
  Teams
]).name;
