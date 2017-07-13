import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DepartmentListComponent }    from './department-list.component';
import { DepartmentDetailComponent }  from './department-detail.component';
import { DepartmentService } from './department.service';
import { DepartmentsRoutingModule } from './departments-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DepartmentsRoutingModule
  ],
  declarations: [
    DepartmentListComponent,
    DepartmentDetailComponent
  ],
  providers: [
    DepartmentService
  ]
})

export class DepartmentsModule {}
