import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent }    from './department-list.component';
import { DepartmentDetailComponent }  from './department-detail.component';

const departmentsRoutes: Routes = [
  { path: 'departments',  component: DepartmentListComponent },
  { path: 'department/:id', component: DepartmentDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(departmentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DepartmentsRoutingModule { }
