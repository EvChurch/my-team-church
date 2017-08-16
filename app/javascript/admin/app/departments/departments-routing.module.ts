import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent }    from './list/department-list.component';
import { DepartmentDetailComponent }  from './detail/department-detail.component';

const departmentsRoutes: Routes = [
  { path: 'departments',  component: DepartmentListComponent, children: [
    { path: ':id', component: DepartmentDetailComponent, outlet: 'workspace' }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(departmentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DepartmentsRoutingModule {}
