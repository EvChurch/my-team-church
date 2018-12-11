import Component from './detail.component';
import Entities from './entities/index.module';
import Items from './items/index.module';
import JobDescription from './jobDescription/jobDescription.component';
import Training from './training/training.component';

export default angular.module('app.components.departments.detail.positions.detail', [
  Component,
  Entities,
  Items,
  JobDescription,
  Training
]).name;
